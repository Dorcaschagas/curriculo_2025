class CurriculoController {
  constructor() {
    this.model = new CurriculoModel();
    this.view = new CurriculoView();
    this.init();
  }

  init() {
    this.loadCurriculo();
    this.setupEventListeners();
  }

  loadCurriculo() {
    try {
      this.view.showLoading();

      setTimeout(() => {
        const dados = {
          dadosPessoais: this.model.getDadosPessoais(),
          portfolio: this.model.getPortfolio(),
          resumoProfissional: this.model.getResumoProfissional(),
          experienciaProfissional: this.model.getExperienciaProfissional(),
          formacao: this.model.getFormacao(),
          cursos: this.model.getCursos(),
          idiomas: this.model.getIdiomas(),
        };

        this.view.renderCurriculo(dados);

        setTimeout(() => {
          this.view.applyAnimations();
        }, 100);
      }, 500);
    } catch (error) {
      if (this.view.mainContainer) {
        this.view.mainContainer.innerHTML = `
          <div class="alert alert-danger text-center">
            <h4>Erro ao carregar currículo</h4>
            <p>${error.message}</p>
            <button class="btn btn-primary" onclick="window.location.reload()">Tentar novamente</button>
          </div>
        `;
      }
    }
  }

  setupEventListeners() {
    window.exportToPDF = () => this.exportToPDF();
    window.exportToText = () => this.exportToText();
  }

  async exportToPDF() {
    try {
      const exportButtons = document.querySelector(".export-buttons");
      if (exportButtons) {
        exportButtons.style.visibility = "hidden";
      }

      if (typeof html2canvas === "undefined") {
        throw new Error(
          "html2canvas não está carregado. Verifique a conexão com a internet."
        );
      }

      if (typeof window.jspdf === "undefined") {
        throw new Error(
          "jsPDF não está carregado. Verifique a conexão com a internet."
        );
      }

      document.body.classList.add("pdf-export-mode");

      // Coleta informações dos links antes de gerar o canvas
      const linkData = this.collectLinkData();

      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = document.body;

      const options = {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        letterRendering: true,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        removeContainer: true,
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        ignoreElements: function (element) {
          return (
            element.classList && element.classList.contains("export-buttons")
          );
        },
        onclone: function (clonedDoc) {
          const clonedBody = clonedDoc.body;
          clonedBody.style.backgroundColor = "#ffffff";

          const allElements = clonedDoc.querySelectorAll("*");
          allElements.forEach((el) => {
            if (
              el.tagName === "P" ||
              el.tagName === "H1" ||
              el.tagName === "H2" ||
              el.tagName === "H3" ||
              el.tagName === "H4" ||
              el.tagName === "H5" ||
              el.tagName === "LI" ||
              el.tagName === "SPAN"
            ) {
              el.style.color = "#000000";
              el.style.opacity = "1";
            }

            if (el.classList.contains("section-title")) {
              el.style.color = "#667eea";
            }

            if (el.classList.contains("text-muted")) {
              el.style.color = "#6c757d";
            }

            if (el.classList.contains("skill-tag")) {
              el.style.backgroundColor = "#f8f9fa";
              el.style.color = "#667eea";
              el.style.border = "2px solid #667eea";
            }

            // Destaca os links para facilitar identificação no PDF
            if (el.tagName === "A") {
              el.style.color = "#667eea";
              el.style.textDecoration = "underline";
              el.style.fontWeight = "500";
            }
          });
        },
      };

      const canvas = await html2canvas(element, options);

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas vazio - verifique se há conteúdo na página");
      }

      const imgData = canvas.toDataURL("image/png", 1.0);
      const { jsPDF } = window.jspdf;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: false,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;

      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = margin;
      let remainingHeight = imgHeight;
      let currentPage = 0;

      // Adiciona a primeira página com imagem
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      
      // Adiciona links clicáveis na primeira página
      this.addLinksToPage(pdf, linkData, currentPage, margin, imgWidth, imgHeight, canvas, pageHeight);
      
      remainingHeight -= pageHeight - margin * 2;

      // Adiciona páginas adicionais se necessário
      while (remainingHeight > 0) {
        currentPage++;
        position = -(imgHeight - remainingHeight) + margin;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        
        // Adiciona links clicáveis na página atual
        this.addLinksToPage(pdf, linkData, currentPage, margin, imgWidth, imgHeight, canvas, pageHeight);
        
        remainingHeight -= pageHeight - margin * 2;
      }

      const fileName = "Dorcas_Chagas_Curriculo.pdf";
      pdf.save(fileName);
    } catch (error) {
      alert("Erro ao gerar PDF: " + error.message);
    } finally {
      document.body.classList.remove("pdf-export-mode");
      const exportButtons = document.querySelector(".export-buttons");
      if (exportButtons) {
        exportButtons.style.visibility = "visible";
      }
    }
  }

  // Método para coletar dados dos links na página
  collectLinkData() {
    const links = [];
    const linkElements = document.querySelectorAll('a[href]');
    
    linkElements.forEach((link, index) => {
      const rect = link.getBoundingClientRect();
      const url = link.getAttribute('href');
      
      if (url && rect.width > 0 && rect.height > 0) {
        links.push({
          url: url,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
          text: link.textContent.trim()
        });
      }
    });
    
    return links;
  }

  // Método para adicionar links clicáveis ao PDF
  addLinksToPage(pdf, linkData, pageNumber, margin, imgWidth, imgHeight, canvas, pageHeight) {
    const scaleX = imgWidth / canvas.width;
    const scaleY = imgHeight / canvas.height;
    const pageStartY = pageNumber * (pageHeight - margin * 2);
    const pageEndY = pageStartY + (pageHeight - margin * 2);

    linkData.forEach(link => {
      // Converte coordenadas da tela para coordenadas do PDF
      const pdfX = margin + (link.x * scaleX);
      const pdfY = margin + ((link.y - pageStartY) * scaleY);
      const pdfWidth = link.width * scaleX;
      const pdfHeight = link.height * scaleY;

      // Verifica se o link está dentro da página atual
      if (link.y >= pageStartY && link.y <= pageEndY) {
        try {
          // Adiciona o link clicável no PDF
          pdf.link(pdfX, pdfY, pdfWidth, pdfHeight, { url: link.url });
        } catch (error) {
          console.warn('Erro ao adicionar link:', error);
        }
      }
    });
  }

  updateCurriculo(novosDados) {
    try {
      Object.assign(this.model, novosDados);

      this.loadCurriculo();
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error);
    }
  }

  getCurrentData() {
    return {
      dadosPessoais: this.model.getDadosPessoais(),
      portfolio: this.model.getPortfolio(),
      resumoProfissional: this.model.getResumoProfissional(),
      experienciaProfissional: this.model.getExperienciaProfissional(),
      formacao: this.model.getFormacao(),
      cursos: this.model.getCursos(),
      idiomas: this.model.getIdiomas(),
    };
  }

  reloadCurriculo() {
    this.loadCurriculo();
  }

  updateDadosPessoais(novosDados) {
    if (this.model.updateDadosPessoais(novosDados)) {
      this.view.renderDadosPessoais(this.model.getDadosPessoais());
      return true;
    }
    return false;
  }

  addExperiencia(novaExperiencia) {
    if (this.model.addExperiencia(novaExperiencia)) {
      const experienciaSection = this.view.renderExperienciaProfissional(
        this.model.getExperienciaProfissional()
      );

      const experienciaContainer = document.querySelector(
        ".row.fade-in:nth-child(3)"
      );
      if (experienciaContainer) {
        experienciaContainer.outerHTML = experienciaSection;
      }
      return true;
    }
    return false;
  }

  addSkill(skill) {
    if (this.model.addSkill(skill)) {
      const skillsContainer = document.querySelector(".skills-container");
      if (skillsContainer) {
        const skills = this.model.getResumoProfissional().hardSkills;
        skillsContainer.innerHTML = skills
          .map((s) => `<span class="skill-tag">${s}</span>`)
          .join("");
      }
      return true;
    }
    return false;
  }

  exportData() {
    const data = this.model.exportToJSON();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "curriculo_dorcas_chagas.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = e.target.result;
      if (this.model.importFromJSON(jsonData)) {
        this.loadCurriculo();
        alert("Dados importados com sucesso!");
      } else {
        alert("Erro ao importar dados. Verifique o formato do arquivo.");
      }
    };
    reader.readAsText(file);
  }

  toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  }

  saveState() {
    const data = this.model.exportToJSON();
    localStorage.setItem("curriculoData", data);
  }

  loadState() {
    const savedData = localStorage.getItem("curriculoData");
    if (savedData) {
      return this.model.importFromJSON(savedData);
    }
    return false;
  }
}
