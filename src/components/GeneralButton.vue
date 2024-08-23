<script setup lang="ts">
defineProps<{
	onClick: (payload: MouseEvent) => void
	disabled?: boolean
}>()
</script>

<template>
	<button @click="onClick" :disabled="disabled" :class="disabled ? 'cursor-not-allowed opacity-80' : ''"
		class="bg-black text-white p-2 px-4 flex justify-center rounded dark:bg-white dark:text-black">
		<slot />
	</button>
</template>