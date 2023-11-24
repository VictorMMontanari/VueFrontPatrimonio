<template>
    <DataTable :value="nodes">
        <Toolbar class="mb-4">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="newProductDialog = true" />

            </template>
        </Toolbar>
        <template #header>
            <div class="text-xl font-bold">Pagina usuario</div>
        </template>
        <Column field="blocoId" header="Bloco Id"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="ativo" header="Ativo"></Column>
        <Column headerStyle="width: 10rem">
            <template #body="slotProps">
                <div class="flex flex-wrap gap-2">
                    <Button type="button" icon="pi pi-pencil" rounded severity="success"
                        @click="editProduct(slotProps.data)" />
                    <Button type="button" icon="pi pi-trash" severity="danger" rounded
                        @click="confirmDeleteProduct(slotProps.data)" />
                </div>
            </template>
        </Column>
        <template #footer>
            <div class="flex justify-content-start">
                <Button icon="pi pi-refresh" label="Reload" severity="warning" @click="reloadData" />
            </div>
        </template>
        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.nome }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>
        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
            class="p-fluid">
            <div class="confirmation-content" style="margin-top: 1.5rem;">
                <div class="flex flex-column gap-2">
                    <div class="flex gap-2">
                        <span class="p-float-label">
                            <InputText id="nome" v-model="product.nome" />
                            <label for="nome">Nome</label>
                        </span>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="newProductDialog" :style="{ width: '450px' }" header="New Product" :modal="true"
            class="p-fluid">
            <div class="confirmation-content" style="margin-top: 1.5rem;">
                <div class="flex flex-column gap-2">
                    <div class="flex gap-2">
                       

                        <span class="p-float-label">
                            <InputText id="newnome" v-model="newProduct.nome" />
                            <label for="newnome">Nome</label>
                        </span>
                    </div>

                 
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideNewDialog" />
                <Button label="Save" icon="pi pi-check" text @click="saveNewProduct" />
            </template>
        </Dialog>
    </DataTable>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

const nodes = ref([]);
const deleteProductDialog = ref(false);
const productDialog = ref(false);
const newProductDialog = ref(false);
const product = ref({
    nome: '',
    ativo: true, // ou false, dependendo do valor inicial correto do banco de dados
});

const getTreeTableNodes = () => {
    return fetch('https://localhost:7038/api/Bloco')
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            return data.map(item => ({ blocoId: item.blocoId, ...item }));
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
    const id = product.value.blocoId;

    if (!id) {
        console.error('Product ID not found.');
        return;
    }

    // Log do JSON antes de enviar
    console.log('JSON to be sent:', product.value);

    fetch(`https://localhost:7038/api/Bloco`, {
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
                if (item.blocoId === id) {
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
    const id = product.value.blocoId;
    fetch(`https://localhost:7038/api/Bloco/${id}`, {
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
                if (item.blocoId === id) {
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
    nome: '',
    ativo: true,
});

const saveNewProduct = () => {
    fetch('https://localhost:7038/api/Bloco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: newProduct.value.nome,
            ativo: newProduct.value.ativo
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
  