<script setup lang="ts">
import '@fontsource-variable/inter'
import { RouterView } from 'vue-router'
import StarWarsLogo from '@/components/illustrations/StarWarsLogo.vue'

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
const handleDarkModeLoad = () => {
	if (
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
}

const handleDarkModeChange = () => {
	if (document.documentElement.classList.contains('dark')) {
		document.documentElement.classList.remove('dark')
		// Whenever the user explicitly chooses light mode
		localStorage.theme = 'light'
	} else {
		document.documentElement.classList.add('dark')
		// Whenever the user explicitly chooses dark mode
		localStorage.theme = 'dark'
	}
}

handleDarkModeLoad()
</script>

<template>
	<header class="container lg:p-6 mx-auto flex flex-wrap items-center justify-between p-4">
		<RouterLink to="/" alt="Star wars exercise logo">
			<StarWarsLogo />
		</RouterLink>
		<button class="bg-black text-white p-2 px-4 flex justify-center rounded dark:bg-white dark:text-black"
			@click="handleDarkModeChange">
			<svg class="w-6 h-6 text-white dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
				width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
			</svg>
		</button>
	</header>

	<main class="container p-6 lg:p-8 mx-auto flex-grow">
		<RouterView />
	</main>

	<footer class="mx-auto mt-0 w-full bg-black p-6 text-white dark:bg-gray-900">
		<div class="flex max-w-screen-xl justify-between sm:text-left">
			<p class="text-xs">2024 - by Thomas Jonstrup</p>
		</div>
	</footer>
</template>