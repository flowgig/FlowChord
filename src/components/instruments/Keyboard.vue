<template>
	<div id="keyboard" class="keyboard active">
		<div>
			<!--<settings></settings>-->
		</div>
		<div class="keys">
			<key v-for="(key, keyNumber) in settings.keys" v-bind:key-number="keyNumber" v-bind:selected-key="$parent.selectedKey"></key>
		</div>
	</div>
</template>

<script>

import Settings from './keyboard/Settings.vue';
import Key from './keyboard/Key.vue';

export default {
	name: 'Keyboard',
	components: {
			settings: Settings,
			key: Key
		},
		
		props: ['settings']
		
		
	}
	</script>
