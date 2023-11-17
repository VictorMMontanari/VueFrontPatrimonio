<template>
    <ul class="">
        <li class="nome"><a class="active" href="#home">Nome</a></li>
        <li class="avatar"><Avatar icon="pi pi-user" style="background-color: #000000; color: #ffffff" shape="circle" /></li>
    </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--dark);
}

li {
  float: right;
}

.avatar {
    padding: 10px 0px 10px 0px;
} 

.nome a  {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.nome a:hover {
  background-color: #111;
}
</style>