var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

// Stateless functional component
function SelectLanguage (props) {
    var langs = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className="languages">
        {langs.map(function (language) {
            return (
                <li style={language === props.selectedLanguage ? {color : '#D0021B'} : null}
                    key={language}
                    onClick={props.onSelect.bind(null, language)}>
                {language}
                </li> 
            )
        }, this)}
    </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

function RepoGrid (props) {
    return (
        <ul className="popularList">
        {props.repos.map(function (repo, index) {
            return(
                <li key={repo.name} className="popularItem">
                    <div className="popularRank">#{index + 1}</div>
                    <ul className="listItem">
                        <li><img className="avatarUser" src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/></li>
                        <li><a href={repo.html_url} />{repo.name}</li>
                        <li>@{repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>
                    </ul>
                </li>
            )
        })}
        </ul>
    )
}
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor (props) {
        super(props);   // Constructores em REACT invocam sempre o do Super
        this.state = {  // Guardar estado em REACT.js
            selectedLanguage: 'All',
            repos: null
        };

        // Se o updateLanguage for invocado no contexto errado!
        // Assim, this da direita está sempre bounded ao this da esquerda.
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    // perform action right after the component is mounted to the DOM
    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) { // Modificador de estado
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        })

        api.fetchPopularRepos(lang)
        .then(function (repos) {
            this.setState(function () {
                return {
                    repos: repos
                }
            })
        }.bind(this));
    }

    render() {
        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
                {! this.state.repos ? <p>LOADING...</p> :
                    <RepoGrid repos={this.state.repos} /> }
            </div>
        )
    }
}

module.exports = Popular;