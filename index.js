document.addEventListener("DOMContentLoaded", function () {
  try {
    if (typeof CurriculoController === "undefined") {
      return;
    }
    window.curriculoApp = new CurriculoController();
    setupDevelopmentFeatures();
  } catch (error) {}
});

window.exportToPDF = function () {
  if (window.curriculoApp) {
    window.curriculoApp.exportToPDF();
  } else {
    alert("Aplicação não foi inicializada corretamente. Recarregue a página.");
  }
};

function setupDevelopmentFeatures() {
  window.addSkill = function (skill) {
    if (window.curriculoApp) {
      const success = window.curriculoApp.addSkill(skill);
      return success;
    }
    return false;
  };

  window.exportData = function () {
    if (window.curriculoApp) {
      window.curriculoApp.exportData();
    }
  };

  window.reloadCurriculo = function () {
    if (window.curriculoApp) {
      window.curriculoApp.reloadCurriculo();
    }
  };
}
