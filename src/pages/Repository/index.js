import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssuesList, Buttons, IssueState, Nav } from './styles';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
        error: false,
        page: 1,
        issuesState: 'all',
    };

    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        try {
            const [repository, issues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    },
                }),
            ]);

            this.setState({
                repository: repository.data,
                issues: issues.data,
                loading: false,
            });
        } catch (err) {
            this.setState({
                error: true,
            });
        }
    }

    handleFilter = async (state = 'all') => {
        const { match } = this.props;

        const { page } = this.state;

        const repoName = decodeURIComponent(match.params.repository);

        try {
            const [repository, issues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state,
                        page,
                        per_page: 5,
                    },
                }),
            ]);

            this.setState({
                repository: repository.data,
                issues: issues.data,
                loading: false,
                issuesState: state,
            });
        } catch (err) {
            this.state({
                error: true,
            });
        }
    };

    prevPage = state => {
        const { page } = this.state;

        this.setState({
            page: page - 1,
        });

        this.handleFilter(state);
    };

    nextPage = state => {
        const { page } = this.state;

        this.setState({
            page: page + 1,
        });

        this.handleFilter(state);
    };

    render() {
        const {
            repository,
            issues,
            loading,
            error,
            page,
            issuesState,
        } = this.state;

        if (error) {
            return (
                <Container>
                    Not possible to retrieve repository data D:
                    <br />
                    <Link to="/">Back to repositories</Link>
                </Container>
            );
        }

        if (loading) {
            return <Loading>Carregando...</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Back to repositories</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssuesList>
                    <Buttons>
                        <button
                            type="button"
                            className="all"
                            onClick={() => this.handleFilter()}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            className="open"
                            onClick={() => this.handleFilter('open')}
                        >
                            Open
                        </button>
                        <button
                            type="button"
                            className="closed"
                            onClick={() => this.handleFilter('closed')}
                        >
                            Closed
                        </button>
                    </Buttons>

                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.state === 'open' ? (
                                        <IssueState background="green">
                                            {issue.state}
                                        </IssueState>
                                    ) : (
                                        <IssueState background="red">
                                            {issue.state}
                                        </IssueState>
                                    )}
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>
                <Nav>
                    {page > 1 && (
                        <button
                            type="button"
                            onClick={() => this.prevPage(issuesState)}
                        >
                            Prev
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => this.nextPage(issuesState)}
                    >
                        Next
                    </button>
                </Nav>
            </Container>
        );
    }
}
