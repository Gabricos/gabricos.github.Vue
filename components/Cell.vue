<template>
    <div class="cell" @click="$emit('click')">
        {{ value }}
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.cell {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-size: 3rem;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    border-radius: 5px;
}

.cell:hover {
    background-color: #e0e0e0;
}

.cell:active {
    transform: scale(0.95);
}
</style>