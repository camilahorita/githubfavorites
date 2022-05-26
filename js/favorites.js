import { GithubUser } from "./GithubUser.js";

// classe que vai conterr a logica dos dados, como os dados serão estruturados
export class Favorites {
  constructor(root){
    this.root = document.querySelector(root);
    this.load();
    // GithubUser.search('maykbrito').then(user => console.log(user))

  };
  async add (username) {
    // vai aguardar essa promessa, parece sincrono, não necessita colocar os .then
    try {

    const userExists = this.entries.find(entry => entry.login === username)

    if(userExists){
      throw new Error("Usuário já cadastrado")
    }
    const user = await GithubUser.search(username);

    if(user.login === undefined){
        throw new Error('Usuário não encontrado!')
    }
      
    this.entries = [user, ...this.entries]
    this.update()
    this.save()

    }  catch(error) {
      alert(error.message)
    }

  }
  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    
  }
  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }
  delete(user){
    // aqui não é retornado o mesmo array, é criado um novo arrray sem este elemento
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    
    this.entries =filteredEntries
    this.update()
    this.save()
  }
}

// classe que vai cirar a visualização e os eventos do html

export class FavoritesView extends Favorites {
  constructor(root){
    super(root);

    this.tbody = this.root.querySelector('table tbody');
    this.update();
    this.onadd();
  }

  onadd(){
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input');

      this.add(value)
    }
  }

  update(){
    this.removeAllTr()
   
   this.entries.forEach( user => {

    const row = this.createRow()

    row.querySelector('.user img').src = `https://github.com/${user.login}.png`
    row.querySelector('.user img').alt = `Imagem de ${user.name}`
    row.querySelector('.user a').href = `https://github.com/${user.login}`
    row.querySelector('.user p').textContent = user.name
    row.querySelector('.user span ').textContent = user.login
    row.querySelector('.repositories ').textContent = user.public_repos
    row.querySelector('.followers ').textContent = user.followers
    this.tbody.append(row)

    row.querySelector('.remove').onclick = () => {

      const isOk= confirm('Tem certeza que deseja deletar este item?');
      if (isOk){
        this.delete(user);
      } else {}
    }

   })

  
  }

  removeAllTr() {

    this.tbody.querySelectorAll('tr').forEach((tr) => {
      // por que aqui eu não preciso usar o this?
      tr.remove()
    });
  }

  createRow (){
    const tr = document.createElement(`tr`);

    const data = ` 
    <td class="user">
      <img src="https://github.com/camilahorita.png" alt="Imagem Camila">
      <a href="https://github.com/camilahorita" target="_blank">
        <p>Camila Horita</p>
        <span>camilahorita</span>
      </a>
    </td>
    <td class="repositories"> 
      76
    </td>
    <td class="followers">
      10
    </td>
    <td><button class="remove">&times;</button></td>
    `;
    tr.innerHTML = data;

    return tr;
    
   
  }
}