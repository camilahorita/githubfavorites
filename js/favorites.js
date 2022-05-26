// classe que vai conterr a logica dos dados, como os dados serão estruturados
export class Favorites {
  constructor(root){
    this.root = document.querySelector(root);
    this.load();

  };
  load() {
    this.entries =[{
      login: 'maykbrito',
      name: "Mayk Brito",
      public_repos: '76',
      followers: '12000'
    },
    {
      login: 'diego3g',
      name: "Diego Fernandes",
      public_repos: '76',
      followers: '12000'
    }
   ]
  };
  delete(user){
    // aqui não é retornado o mesmo array, é criado um novo arrray sem este elemento
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    
    this.entries =filteredEntries
    this.update()
  }
}

// classe que vai cirar a visualização e os eventos do html

export class FavoritesView extends Favorites {
  constructor(root){
    super(root);

    this.tbody = this.root.querySelector('table tbody');
    this.update();
  }

  update(){
    this.removeAllTr()
   
   this.entries.forEach( user => {

    const row = this.createRow()

    row.querySelector('.user img').src = `https://github.com/${user.login}.png`
    row.querySelector('.user img').alt = `Imagem de ${user.name}`
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