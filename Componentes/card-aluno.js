class card extends HTMLElement {
    constructor () 
    {
        super();
        this.shadow = this.attachShadow({mode:'open'});
        this.nome = 'Nome do Aluno';
        this.bgcolor = 'darkcyan'
        this.turma = 'Turma do Aluno'
    }

    static get observedAttributes()
    {
        return ['nome', 'bgcolor', 'turma']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue)
    {
        this[nameAttr] = newValue
    }

    connectedCallback() 
    {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles()
    {
        const style = document.createElement('style')
        style.textContent = `
        .card {
            width: 250px;
            height: 200px;
            background-color: ${this.bgcolor};
            display: grid;
            grid-template-rows: 20% 60% 20%;
            place-items: center;
        }

        .card__titulo {
            color: #fff;
            font-size: 2rem;
        }

        .card__imagem {
            width: 60%;
            height: 100%;
            background-image: url(https://akamai.sscdn.co/uploadfile/letras/fotos/1/7/2/6/1726461f28caf13e781f94b68f8dd790.jpg);
            background-size: cover;
        }

        .card__turma{
             color: #fff;

         }
        `
        return style
    }

    component() 
    {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
        <div class="card__titulo">${this.nome}</div>
        <div class="card__imagem"><div>
        <div class="card__turma">${this.turma}<div>
       
        `
        return card
    }
} 

customElements.define('card-aluno', card)