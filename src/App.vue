<script setup lang="ts">
import '@fontsource-variable/inter'
import { RouterView } from 'vue-router'
import StarWarsLogo from '@/components/illustrations/StarWarsLogo.vue'
import IconMoon from '@/components/icons/IconMoon.vue';
import IconSun from '@/components/icons/IconSun.vue';

const activeTheme = localStorage.theme;

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
	<header class="container max-w-5xl lg:p-6 mx-auto flex flex-wrap items-center justify-between p-4">
		<RouterLink to="/" alt="Star wars exercise logo" aria-label="Home link">
			<StarWarsLogo />
		</RouterLink>
		<button class="bg-black text-white p-2 px-4 flex justify-center rounded dark:bg-white dark:text-black"
			@click="handleDarkModeChange" title="Change Theme mode">
			<IconMoon v-if="activeTheme !== 'dark'" />
			<IconSun v-else />
		</button>
	</header>

	<main class="container max-w-5xl p-6 lg:p-8 mx-auto flex-grow">
		<RouterView />
	</main>

	<footer class="mx-auto mt-0 w-full bg-black p-6 text-white dark:bg-gray-900">
		<div class="container mx-auto max-w-5xl">
			<div class="flex  justify-between sm:text-left">
				<p class="text-xs">2024 - by Thomas Jonstrup</p>
			</div>
		</div>
	</footer>
</template>