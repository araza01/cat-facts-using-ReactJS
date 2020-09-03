import React, { Component } from 'react'

export default class CatFacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            items: []
        }
    }

    componentDidMount() {
        fetch("https://cat-fact.herokuapp.com/facts/random?amount=5")
        .then(response => response.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                items: result.items
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    render() {
        const isLoaded = this.state.isLoaded;
        const error = this.state.error;
        const items = this.state.items;
        
        if(error) {
            return (
                <section className="container">
                    <article className="fact-font">
                        Error: {error.message}
                    </article>
                </section>
            );
        } else if(!isLoaded) {
            return (
                <section className="container">
                    <article className="fact-font">
                        Loading<i className="fa fa-spinner fa-spin"></i>
                    </article>
                </section>
            );
        }
        return (
            <section className="container">
                <article className="heading">
                    <div>Some interesting facts about CAT:</div>
                </article>
                <article className="fact-container fact-font">
                    <ul>
                        {
                            items.map((fact) => {
                                <li key={fact.id}>{fact.text}</li>
                            })
                        }
                    </ul>
                </article>
                <article className="btn">
                    <button>Get more facts</button>
                </article>
            </section>
        );
    }
}
