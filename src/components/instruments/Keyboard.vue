<template>
	<div id="keyboard" class="keyboard active">
		<div class="keys">
			<key v-for="(key, keyNumber) in settings.keys" v-bind:key-number="keyNumber" v-bind:selected-key="$parent.selectedKey"></key>
		</div>
	</div>
</template>

<script>

import Key from './keyboard/Key.vue';

export default {
	name: 'Keyboard',
	components: {
		key: Key
	},
	
	props: ['settings']
	
	
}
</script>
