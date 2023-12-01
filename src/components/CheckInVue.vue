<template>
    <DataTable :value="nodes" v-model:selection="selectedProduct">
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Gerar Registro Anual" icon="pi pi-plus" severity="success" class="mr-2" @click="newProductDialog = true" />

            </template>
        </Toolbar>
        <template #header>
            <div class="text-xl font-bold">Pagina Patrimonio</div>
        </template>
        <Column field="patrimonioId" header="Id Patrimonio"></Column>
        <Column field="codigoBarra" header="Código de Barras"></Column>
        <Column field="tipo" header="Tipo"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column header="Status">
            <!-- <template #body="slotProps">
                <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
            </template> -->
        </Column>
        <Column header="Check" selectionMode="single"></Column>
        <Column headerStyle="width: 10rem">
            
        </Column>
        <template #footer>
            <div class="flex justify-content-start">
                <div style="display: flex;">
                    <Button icon="pi pi-refresh" label="Reload" severity="warning" @click="reloadData" />
                </div>
                
                <div style="display: flex; justify-content: right; width: 100%;">
                    <Button icon="pi pi-save" label="Cadastrar Check-In" severity="success" @click="reloadData" />
                </div>
            </div>
        </template> 
    </DataTable>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

const nodes = ref([]);
const deleteProductDialog = ref(false);
const selectedProduct = ref();
const productDialog = ref(false);
const newProductDialog = ref(false);
const product = ref({
    codigoBarra: '',
    tipo: '',
    nome: '',
    valor: null, // ou 0, dependendo do tipo esperado
    notaFiscal: '',
    ativo: true, // ou false, dependendo do valor inicial correto do banco de dados
});

const getTreeTableNodes = () => {
    return fetch('https://localhost:7038/api/Patrimonio')
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            return data.map(item => ({ patrimonioId: item.patrimonioId, ...item }));
        });
};

const reloadData = () => {
    console.log('Recarregando dados...');
    getTreeTableNodes().then((data) => {
        console.log('Dados após recarregar:', data);
        nodes.value = data;
        console.log('Nodes:', nodes.value);
    });
};

onMounted(() => {
    getTreeTableNodes().then((data) => {
        nodes.value = data;
        console.log('Nodes:', nodes.value);
    });
});


const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    const id = product.value.patrimonioId;

    if (!id) {
        console.error('Product ID not found.');
        return;
    }

    // Log do JSON antes de enviar
    console.log('JSON to be sent:', product.value);

    fetch(`https://localhost:7038/api/Patrimonio/`, {
        method: 'PUT', // ou 'PATCH' dependendo da sua API
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product.value),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            return response.json();
        })
        .then(updatedProduct => {
            // Atualizar localmente os dados após o sucesso da chamada à API
            nodes.value = nodes.value.map(item => {
                if (item.patrimonioId === id) {
                    return { ...item, ...updatedProduct };
                }
                return item;
            });
            console.log('Product updated successfully');
        })
        .catch(error => {
            console.error('Error updating product:', error);
        })
        .finally(() => {
            productDialog.value = false;
            product.value = {};
        });
};

const editProduct = (prod) => {
    product.value = { ...prod };
    // Certifique-se de que prod.ativo seja um booleano (true ou false) para evitar problemas
    product.ativo = Boolean(prod.ativo);
    productDialog.value = true;
};

const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};


const deleteProduct = () => {
    // Fazer uma chamada à API para desativar o item
    const id = product.value.patrimonioId;
    fetch(`https://localhost:7038/api/Patrimonio/${id}`, {
        method: 'PUT', // ou 'PATCH' dependendo da sua API
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ativo: false }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to deactivate product');
            }
            return response.json();
        })
        .then(() => {
            // Atualizar localmente os dados após o sucesso da chamada à API
            nodes.value = nodes.value.map(item => {
                if (item.patrimonioId === id) {
                    return { ...item, ativo: false };
                }
                return item;
            });
            console.log('Product deactivated successfully');
        })
        .catch(error => {
            console.error('Error deactivating product:', error);
        })
        .finally(() => {
            deleteProductDialog.value = false;
            product.value = {};
        });
    // toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};


const newProduct = ref({
  codigoBarra: '',
  tipo: '',
  nome: '',
  valor: null,
  notaFiscal: '',
  ativo: true,
  dataRegistro: new Date().toISOString(),
  usuarioId: 0,
  blocoId: 0,
});

const saveNewProduct = () => {
  fetch('https://localhost:7038/api/Patrimonio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      codigoBarra: newProduct.value.codigoBarra,
      tipo: newProduct.value.tipo,
      nome: newProduct.value.nome,
      valor: newProduct.value.valor,
      notaFiscal: newProduct.value.notaFiscal,
      ativo: newProduct.value.ativo,
      dataRegistro: newProduct.value.dataRegistro,
      usuarioId: newProduct.value.usuarioId,
      blocoId: newProduct.value.blocoId,
      // Adicione outros campos conforme necessário
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create new product');
      }
      return response.json();
    })
    .then(() => {
      // Atualizar localmente os dados após o sucesso da chamada à API
      reloadData();
      console.log('New product created successfully');
    })
    .catch(error => {
      console.error('Error creating new product:', error);
    })
    .finally(() => {
      newProductDialog.value = false;
    });
};

const hideNewDialog = () => {
  newProductDialog.value = false;
};


</script>

<style scoped>
.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.gap-2 {
    gap: 2rem;
}

.confirmation-content {
    margin-top: 1.5rem;
}
</style>
  