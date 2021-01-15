import React, { Component } from 'react';
import { Table } from 'reactstrap';
import logo from './../images/devto.png'
// import { GrSettingsOption } from "@react-icons/all-files/gr/GrSettingsOption";
// import Modal from './ModalDevAPI.js';

export default class DevAPI extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            article_tag: "",
            show: false,
            set_timer: 500000000000,
            interval_id: null
        };
        // this.showModal = this.showModal.bind(this);
        // this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    async getArticle() {
        if (this.state.article_tag === "") {
            const response = await fetch("https://dev.to/api/articles")
            const article = await response.json();
            return article
        }
        else {
            const response = await fetch("https://dev.to/api/articles?tag=" + this.state.article_tag.replace(" ", "").toLowerCase())
            const article = await response.json();
            return article
        }
    }

    async setArticle() {
        this.getArticle().then(body => {
            this.setState({
                data: body
            })
        })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.setArticle();
        this.setState({
            interval_id: setInterval(() => this.setArticle(), this.state.set_timer)
        })
    }

    queryTagArticle = async (article_tag) => {
        fetch("https://dev.to/api/articles?tag=" + article_tag.replace(" ", "").toLowerCase())
            .then(response => response.json()
                .then(body => {
                    this.setState({
                        data: body
                    })
                }))
            .catch(err => console.log(err))
    }
    setArticleName = (e) => {
        return this.setState({ [e.target.name]: e.target.value });
    };

    searchArticleTag = (e) => {
        e.preventDefault();
        this.queryTagArticle(this.state.article_tag);
    };

    setTimer = (e) => {
        return this.setState({ [e.target.name]: e.target.value });
    };

    editTimer = (e) => {
        e.preventDefault();
        this.setState({
            set_timer: this.state.set_timer
        })
        clearInterval(this.state.interval_id);
        this.setState({
            interval_id: setInterval(() => this.setArticle(), this.state.set_timer)
        })
    };

    render() {
        if (this.state.data.length === 0) {
            return (
                <div className="outer">
                    <h5>No article available</h5>
                    <div className="d-flex align-items-center">
                        <img className="mr-4 mb-3" src={logo} alt="Logo" style={{ width: "15%" }} />
                        <form style={{ width: "100%" }} className="d-flex mb-3" onSubmit={this.searchArticleTag}>
                            <input
                                onChange={this.setArticleName}
                                name="article_tag"
                                className="form-control"
                                type="text"
                                placeholder="Search by tag"
                                aria-label="Search"
                                value={this.state.article_tag}
                            ></input>
                        </form>
                    </div>
                </div>
            )
        };
        return (
            <div className="devto">
                <div className="table-devto">
                    <div className="d-flex align-items-center">
                        <img className="mr-4 mb-3" src={logo} alt="Logo" style={{ width: "15%" }} />
                        <form style={{ width: "100%" }} className="d-flex" onSubmit={this.searchArticleTag}>
                            <input
                                onChange={this.setArticleName}
                                name="article_tag"
                                className="form-control"
                                type="text"
                                placeholder="Search by tag"
                                aria-label="Search"
                                value={this.state.article_tag}
                            ></input>
                        </form>
                    </div>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Claps</th>
                            </tr>
                        </thead>
                        {this.state.data.slice(0, 5).map((article, index) => {
                            return (
                                <tbody key={index} >
                                    <tr>
                                        <td><a href={article.canonical_url}> {article.title}</a></td>
                                        <td>{article.positive_reactions_count}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
                </div>
                <form style={{ width: "100%" }} className="d-flex mb-3" onSubmit={this.editTimer}>
                    <input
                        onChange={this.setTimer}
                        name="set_timer"
                        className="form-control"
                        type="text"
                        placeholder="Set refresh"
                        aria-label="Search"
                        value={this.state.set_timer}
                    ></input>
                </form>
            </div>
        )
    }
}
