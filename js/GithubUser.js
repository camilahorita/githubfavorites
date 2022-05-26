export class GithubUser {
  static search(username){
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
    .then(data => data.json())
    // desestruturando o objeto e depois criar o objeto já retornando ele direto
    .then(({login, name, public_repos, followers}) => ({
      login,
      name,
      public_repos,
      followers
    }))
  }

}