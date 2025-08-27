// Model - Dados do currículo
class CurriculoModel {
  constructor() {
    this.dadosPessoais = {
      nome: "DORCAS CHAGAS",
      cargo: "Desenvolvedora Full Stack",
      telefone: "(38) 9 9883-2698",
      email: "dorcaschagas53@gmail.com",
      cnh: "A e B",
      estadoCivil: "Solteira",
    };

    this.portfolio = {
      linkedin: "https://www.linkedin.com/in/dorcas-chagas/",
      github: "https://github.com/Dorcaschagas",
      site: "https://sitedc.online/portfolio/",
    };

    this.resumoProfissional = {
      area: "Desenvolvimento Web (Fullstack)",
      ferramentas: {
        versionamento: "Git, GitHub, GitLab",
        gerenciamento: "Scrum, Kanban (Metodologias ágeis)",
        deploy:
          "GitHub Actions, GitLab CI, VPS, Firebase, publicação em Play Store e App Store",
      },
      hardSkills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Node.js",
        "Dart",
        "Flutter",
        "Java",
        "C#",
        "Angular",
        "Bootstrap",
        "jQuery",
        "Express",
        "MySQL",
        "PostgreSQL",
        "SQLite",
        "Firebase",
      ],
      arquitetura: "MVVM, MVC, Clean Architecture",
      diferenciais: [
        "Integrações complexas com adquirentes de pagamento (Stone, Cielo, Rede, PagBank, GetNet, AllInOne) via SDK e Deeplink",
        "Experiência com infraestrutura e cloud (Docker, VPS, Firebase)",
        "Aplicativos publicados em produção, incluindo app com mais de 2 mil downloads",
      ],
    };

    this.experienciaProfissional = [
      {
        cargo: "Desenvolvedora Full Stack",
        empresa: "JnMoura Informática - Araraquara, São Paulo",
        periodo: "Outubro 2024 - Atual",
        atividades: [
          "Desenvolvimento e manutenção de softwares, aplicando boas práticas de código e arquitetura",
          "Adaptação visual de páginas e aplicativos, assegurando melhor experiência para o usuário",
          "Otimização de sistemas por meio de revisão e refatoração de código",
          "Levantamento de requisitos e integração de sistemas",
          "Integrações com adquirentes de pagamento (Stone, Rede, PagBank, Cielo, GetNet, AllInOne)",
        ],
      },
      {
        cargo: "Desenvolvedora Full Stack Autônoma",
        empresa: "Autônoma - Araraquara, São Paulo",
        periodo: "Janeiro 2022 - Atual",
        projetos: [
          {
            nome: "Orthocal (Flutter + STL Viewer)",
            descricao:
              "Aplicativo próprio em Flutter para visualização e medição de arquivos STL 3D",
          },
          {
            nome: "Produção Organizada",
            descricao:
              "Sistema de controle de estoque e árvore de produção com Firebase",
          },
          {
            nome: "Sistema de Controle de Tarólogos",
            descricao:
              "Aplicativo de gerenciamento com separação de responsabilidades",
          },
        ],
        destaques: [
          "Deploy em VPS, Firebase, GitHub Actions",
          "Publicação na Apple App Store e Google Play Store (app com mais de 2 mil downloads)",
          "Experiência com múltiplos bancos de dados: MySQL, PostgreSQL, SQLite, Sqflite",
        ],
      },
      {
        cargo: "Desenvolvedora Fullstack",
        empresa: "3Ti software - Araraquara, SP",
        periodo: "Agosto 2023 - Outubro 2024",
        atividades: [
          "Desenvolvimento de aplicações web e mobile",
          "Trabalho com frameworks e bibliotecas (Bootstrap, jQuery, Express)",
          "Integração de sistemas e bancos de dados",
          "Controle de versão (Git, GitHub, GitLab) e metodologias ágeis (Scrum)",
        ],
      },
      {
        cargo: "Subgerente",
        empresa:
          "David & Faria comércio de hortifrutigranjeiros LTDA - Belo Horizonte, MG",
        periodo: "Fevereiro 2017 - Março 2019",
        atividades: [
          "Supervisão das atividades da equipe e orientação de vendedores",
          "Atendimento ao cliente e fechamento de vendas",
          "Desenvolvimento de planos de ação para melhoria constante",
        ],
      },
    ];

    this.formacao = {
      curso: "Tecnólogo Análise e Desenvolvimento de Sistemas",
      instituicao: "UNIVERSIDADE PAULISTA (UNIP) - Araraquara, SP",
      periodo: "Janeiro 2022 - Dezembro 2024",
      // status: "Cursando"
    };

    this.cursos = {
      frontend: "HTML5 e CSS3, JavaScript, Bootstrap, jQuery, Flutter",
      backend: "Node.js, MySQL, PostgreSQL, Dart",
    };

    this.idiomas = [
      { idioma: "Inglês", nivel: "B2 - Intermediário" },
      { idioma: "Espanhol", nivel: "B2 - Intermediário" },
    ];
  }

  // Métodos para acessar os dados
  getDadosPessoais() {
    return this.dadosPessoais;
  }

  getPortfolio() {
    return this.portfolio;
  }

  getResumoProfissional() {
    return this.resumoProfissional;
  }

  getExperienciaProfissional() {
    return this.experienciaProfissional;
  }

  getFormacao() {
    return this.formacao;
  }

  getCursos() {
    return this.cursos;
  }

  getIdiomas() {
    return this.idiomas;
  }

  // Métodos para atualizar dados dinamicamente
  updateDadosPessoais(novosDados) {
    if (this.validateDadosPessoais(novosDados)) {
      Object.assign(this.dadosPessoais, novosDados);
      return true;
    }
    return false;
  }

  updatePortfolio(novoPortfolio) {
    if (this.validatePortfolio(novoPortfolio)) {
      Object.assign(this.portfolio, novoPortfolio);
      return true;
    }
    return false;
  }

  addExperiencia(novaExperiencia) {
    if (this.validateExperiencia(novaExperiencia)) {
      this.experienciaProfissional.unshift(novaExperiencia); // Adiciona no início
      return true;
    }
    return false;
  }

  updateExperiencia(index, dadosAtualizados) {
    if (index >= 0 && index < this.experienciaProfissional.length) {
      if (this.validateExperiencia(dadosAtualizados)) {
        Object.assign(this.experienciaProfissional[index], dadosAtualizados);
        return true;
      }
    }
    return false;
  }

  removeExperiencia(index) {
    if (index >= 0 && index < this.experienciaProfissional.length) {
      this.experienciaProfissional.splice(index, 1);
      return true;
    }
    return false;
  }

  addSkill(skill) {
    if (skill && typeof skill === 'string' && !this.resumoProfissional.hardSkills.includes(skill)) {
      this.resumoProfissional.hardSkills.push(skill);
      return true;
    }
    return false;
  }

  removeSkill(skill) {
    const index = this.resumoProfissional.hardSkills.indexOf(skill);
    if (index > -1) {
      this.resumoProfissional.hardSkills.splice(index, 1);
      return true;
    }
    return false;
  }

  // Métodos de validação
  validateDadosPessoais(dados) {
    const required = ['nome', 'cargo', 'email', 'telefone'];
    return required.every(field => dados[field] && dados[field].trim().length > 0);
  }

  validatePortfolio(portfolio) {
    const urlPattern = /^https?:\/\/.+/;
    return Object.values(portfolio).every(url => urlPattern.test(url));
  }

  validateExperiencia(experiencia) {
    return experiencia.cargo && 
           experiencia.empresa && 
           experiencia.periodo &&
           (experiencia.atividades || experiencia.projetos);
  }

  // Método para obter todos os dados
  getAllData() {
    return {
      dadosPessoais: this.getDadosPessoais(),
      portfolio: this.getPortfolio(),
      resumoProfissional: this.getResumoProfissional(),
      experienciaProfissional: this.getExperienciaProfissional(),
      formacao: this.getFormacao(),
      cursos: this.getCursos(),
      idiomas: this.getIdiomas()
    };
  }

  // Método para exportar dados em JSON
  exportToJSON() {
    return JSON.stringify(this.getAllData(), null, 2);
  }

  // Método para importar dados de JSON
  importFromJSON(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.dadosPessoais) this.dadosPessoais = data.dadosPessoais;
      if (data.portfolio) this.portfolio = data.portfolio;
      if (data.resumoProfissional) this.resumoProfissional = data.resumoProfissional;
      if (data.experienciaProfissional) this.experienciaProfissional = data.experienciaProfissional;
      if (data.formacao) this.formacao = data.formacao;
      if (data.cursos) this.cursos = data.cursos;
      if (data.idiomas) this.idiomas = data.idiomas;
      
      return true;
    } catch (error) {
      console.error('Erro ao importar JSON:', error);
      return false;
    }
  }
}
