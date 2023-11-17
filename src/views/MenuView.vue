<script setup>
  import NavbarVue from '../components/NavbarVue.vue';
  import SidebarVue from '../components/SidebarVue.vue';
</script>

<template>
	<div>
	  <NavbarVue />
	  <div class="app">
		<SidebarVue />
		<div class="main-content">
		  <router-view></router-view>
		</div>
	  </div>
	</div>
  </template>
  
  <style lang="scss" >
  :root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
  }
  
  * {
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
  }
  
  body {
	background: var(--light);
	margin: 0;
  }
  
  button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
  }
  
  .app {
	display: flex;
  }
  
  .main-content {
	flex: 1;
	padding: 2rem;
  
	@media (max-width: 1024px) {
	  padding-left: 6rem;
	}
  
	@media (max-width: 768px) {
	  padding: 2rem;
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
  
  .sidebar {
	width: var(--sidebar-width);
	background: var(--dark);
	color: white;
	padding: 1rem;
  
	@media (max-width: 768px) {
	  width: 100%;
	}
  
	@media (max-width: 400px) {
	  width: 100%;
	  position: absolute;
	  z-index: 2; /* Garante que a barra lateral esteja acima do conteúdo */
	}
  }
  </style>
  