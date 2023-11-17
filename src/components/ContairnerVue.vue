<template>
  <div class="principal">
    <div class="conteudo">
      <!-- Conteúdo do card aqui -->
    </div>
  </div>
</template>

<style scoped>
.conteudo {
  position: relative;
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 10px; 
  width: 100%;
  height: 100%;
  margin: auto;
  z-index: 1;
  overflow-y: auto;
}

.principal {
  grid-area: principal;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%; /* Ajuste a altura para ocupar 100% da tela */
}

.conteudo {
	flex: 1;
	padding: 2rem;
  
	@media (max-width: 1024px) {
	  padding-left: 6rem;
	}
  
	@media (max-width: 768px) {
	  padding: 2rem;
    margin-left: 4rem;
	}
  
	@media (max-width: 400px) {
	  padding: 1rem;
	  margin-right: calc(-1 * var(--sidebar-width)); /* Adiciona margem negativa para evitar sobreposição à barra lateral */
	}
  }
  
  @media (max-width: 768px) {
	.app {
	  flex-direction: column;
	}
  
	.main-content {
	  padding-left: 2rem;
	}
  }
</style>



