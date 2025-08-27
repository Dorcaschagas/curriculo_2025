class CurriculoView {
  constructor() {
    this.mainContainer = document.getElementById('main-content');
    this.headerContainer = document.querySelector('.header-section .container-fluid');
  }

  // Renderizar dados pessoais no header
  renderDadosPessoais(dados) {
    const nomeElement = document.getElementById('nome');
    const cargoElement = document.getElementById('cargo');
    const dadosPessoaisContainer = document.getElementById('dados-pessoais');

    if (nomeElement) nomeElement.textContent = dados.nome;
    if (cargoElement) cargoElement.textContent = dados.cargo;
    
    if (dadosPessoaisContainer) {
      dadosPessoaisContainer.innerHTML = `
        <div class="col-md-4">
          <p>
            <i class="fas fa-envelope" aria-hidden="true"></i>
            <span class="no-wrap">${dados.email}</span>
          </p>
        </div>
        <div class="col-md-4">
          <p>
            <i class="fas fa-phone" aria-hidden="true"></i>
            <span class="no-wrap">${dados.telefone}</span>
          </p>
        </div>
        <div class="col-md-4">
          <p>
            <i class="fas fa-car" aria-hidden="true"></i>
            <i class="fas fa-motorcycle" aria-hidden="true"></i>
            <span class="no-wrap">CNH: ${dados.cnh}</span>
          </p>
        </div>
      `;
    }
  }

  // Renderizar seção de portfólio
  renderPortfolio(portfolio) {
    return `
      <section class="row fade-in">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h2 class="section-title">
                <i class="fas fa-briefcase" aria-hidden="true"></i> PORTFÓLIO
              </h2>
              <div class="row">
                <div class="col-md-4">
                  <p>
                    <strong>LinkedIn:</strong><br />
                    <a href="${portfolio.linkedin}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                      <i class="fab fa-linkedin" aria-hidden="true"></i> linkedin.com/in/dorcas-chagas/
                    </a>
                  </p>
                </div>
                <div class="col-md-4">
                  <p>
                    <strong>GitHub:</strong><br />
                    <a href="${portfolio.github}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                      <i class="fab fa-github" aria-hidden="true"></i> github.com/Dorcaschagas
                    </a>
                  </p>
                </div>
                <div class="col-md-4">
                  <p>
                    <strong>Portfolio:</strong><br />
                    <a href="${portfolio.site}" target="_blank" rel="noopener noreferrer" class="portfolio-link">
                      <i class="fas fa-globe" aria-hidden="true"></i> DorcasChagas/portfolio/
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Renderizar seção de resumo profissional
  renderResumoProfissional(resumo) {
    const skillsHtml = resumo.hardSkills.map(skill => 
      `<span class="skill-tag">${skill}</span>`
    ).join('');

    const diferenciaisHtml = resumo.diferenciais.map(diferencial => 
      `<li>${diferencial}</li>`
    ).join('');

    return `
      <section class="row slide-in">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h2 class="section-title">
                <i class="fas fa-user" aria-hidden="true"></i> RESUMO PROFISSIONAL
              </h2>
              <h4>${resumo.area}</h4>

              <h5 class="mt-4">Ferramentas e Plataformas</h5>
              <p><strong>Versionamento:</strong> ${resumo.ferramentas.versionamento}</p>
              <p><strong>Gerenciamento de Projetos:</strong> ${resumo.ferramentas.gerenciamento}</p>
              <p><strong>Deploy & CI/CD:</strong> ${resumo.ferramentas.deploy}</p>

              <h5 class="mt-4">Hard Skills</h5>
              <div class="mb-3 skills-container">
                ${skillsHtml}
              </div>

              <p><strong>Arquitetura & Boas Práticas:</strong> ${resumo.arquitetura}</p>

              <h5 class="mt-4">Diferenciais</h5>
              <ul>
                ${diferenciaisHtml}
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Renderizar experiência profissional
  renderExperienciaProfissional(experiencias) {
    const experienciasHtml = experiencias.map(exp => {
      let content = `
        <div class="experience-item">
          <h4>${exp.cargo}</h4>
          <h5 class="text-muted">${exp.empresa}</h5>
          <p class="text-muted">
            <i class="fas fa-calendar" aria-hidden="true"></i> ${exp.periodo}
          </p>
      `;

      if (exp.atividades) {
        const atividadesHtml = exp.atividades.map(atividade => 
          `<li>${atividade}</li>`
        ).join('');
        content += `<ul>${atividadesHtml}</ul>`;
      }

      if (exp.projetos) {
        const projetosHtml = exp.projetos.map(projeto => 
          `<li><strong>${projeto.nome}:</strong> ${projeto.descricao}</li>`
        ).join('');
        content += `
          <h6>Projetos Relevantes:</h6>
          <ul>${projetosHtml}</ul>
        `;
      }

      if (exp.destaques) {
        const destaquesHtml = exp.destaques.map(destaque => 
          `<li>${destaque}</li>`
        ).join('');
        content += `
          <h6>Destaques Técnicos:</h6>
          <ul>${destaquesHtml}</ul>
        `;
      }

      content += '</div>';
      return content;
    }).join('');

    return `
      <section class="row fade-in">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h2 class="section-title">
                <i class="fas fa-history" aria-hidden="true"></i> HISTÓRICO PROFISSIONAL
              </h2>
              ${experienciasHtml}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Renderizar formação e cursos
  renderFormacaoECursos(formacao, cursos) {
    return `
      <section class="row slide-in">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="section-title">
                <i class="fas fa-graduation-cap" aria-hidden="true"></i> FORMAÇÃO ACADÊMICA
              </h2>
              <h4>${formacao.curso}</h4>
              <h5 class="text-muted">${formacao.instituicao}</h5>
              <p class="text-muted">
                <i class="fas fa-calendar" aria-hidden="true"></i> ${formacao.periodo}
              </p>
              ${formacao.status ? `<p><strong>Status:</strong> ${formacao.status}</p>` : ''}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="section-title">
                <i class="fas fa-certificate" aria-hidden="true"></i> CURSOS
              </h2>
              <h5>Front-end:</h5>
              <p>${cursos.frontend}</p>
              <h5>Back-end:</h5>
              <p>${cursos.backend}</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Renderizar idiomas
  renderIdiomas(idiomas) {
    const idiomasHtml = idiomas.map((idioma, index) => {
      const colClass = index % 2 === 0 ? 'col-md-6' : 'col-md-6';
      return `
        <div class="${colClass}">
          <h5>${idioma.idioma}</h5>
          <p>Nível ${idioma.nivel}</p>
        </div>
      `;
    }).join('');

    return `
      <section class="row fade-in mt-4">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h2 class="section-title">
                <i class="fas fa-language" aria-hidden="true"></i> IDIOMAS
              </h2>
              <div class="row">
                ${idiomasHtml}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Mostrar loading
  showLoading() {
    if (this.mainContainer) {
      this.mainContainer.innerHTML = `
        <div class="text-center mt-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <p class="mt-3">Carregando currículo...</p>
        </div>
      `;
    }
  }

  // Renderizar todo o currículo
  renderCurriculo(dados) {
    // Renderizar header
    this.renderDadosPessoais(dados.dadosPessoais);
    if (this.mainContainer) {
      const portfolioSection = this.renderPortfolio(dados.portfolio);
      const resumoSection = this.renderResumoProfissional(dados.resumoProfissional);
      const experienciaSection = this.renderExperienciaProfissional(dados.experienciaProfissional);
      const formacaoSection = this.renderFormacaoECursos(dados.formacao, dados.cursos);
      const idiomasSection = this.renderIdiomas(dados.idiomas);

      this.mainContainer.innerHTML = `
        ${portfolioSection}
        ${resumoSection}
        ${experienciaSection}
        ${formacaoSection}
        ${idiomasSection}
      `;
    }
  }

  // Aplicar animações
  applyAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
}
