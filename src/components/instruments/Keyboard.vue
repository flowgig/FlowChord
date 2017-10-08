<template>
	<div id="keyboard" class="keyboard active">
		<div class="row">
			<div class="input-group col-sm-4">
				<input id="keyboard-settings-keys" type="number" min="1" v-model.number="settings.keys">
				<label for="keyboard-settings-keys">Keys</label>
			</div>
			<div class="input-group col-sm-4">
				<select id="keyboard-settings-lowestNote" type="number" v-model.number="settings.lowestNote">
					<option v-for="note in $parent.notes" v-bind:value="note.number - 1">{{ note.name }}</option>
				</select>
				<label for="keyboard-settings-lowestNote">Lowest note</label>
			</div>  
			<div class="clearfix"></div>
		</div>

		<div class="keys">
			<key v-for="key in settings.keys" v-bind:key-number="key" v-bind:selected-key="$parent.selectedKey"></key>
		</div>
	</div>
</template>

<script>

import Settings from './keyboard/Settings.vue';
import Key from './keyboard/Key.vue';

export default {
	name: 'Keyboard',
	components: {
			//settings: Settings,
			key: Key
		},
		
		props: ['settings']
		
		
	}
	</script>
