<template>
	<div id="keyboard" class="keyboard active">
		<h2>Keyboard
		</h2>
		<div class="row">
			<div class="input-group col-sm-4">
				<input id="keyboard-settings-keys" type="number" v-model.number="settings.keys">
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
			<div v-for="key in settings.keys" v-bind:class="'key keycolor-' + $parent.notes[(key + settings.lowestNote) % 12].keycolor">
				<span class="keyname">{{ $parent.notes[(key + settings.lowestNote) % 12].name }}</span>
				<span v-if="$parent.notes[(key + settings.lowestNote) % 12].interval"
				v-bind:class="'marker marker-color-' + $parent.notes[(key + settings.lowestNote) % 12].interval">
				{{ $parent.notes[(key + settings.lowestNote) % 12].interval }}</span>
			</div>
		</div>
	</div>
</template>

<script>

	//import Settings from './keyboard/Settings.vue';
	//import Fret from './keyboard/Fret.vue';

	export default {
		name: 'Keyboard',
		/*components: {
			settings: Settings,
			fret: Fret
		},*/
		
		props: ['settings']
		
		
	}
</script>
