<template>
	<div id="app">
		<main-navigation></main-navigation>
		<main id="mainContent">
			<div class="main-content">
				<h1>
					Chord finder
				</h1>
				<!--<interval-select></interval-select> -->
				<div class="row">
					<div class="input-group col-sm-6">
						<!--<key-select></key-select> -->
						<select v-model="selectedKey" id="selectKey" v-on:change="setActiveNotes">
							<option v-for="note in notes" v-bind:value="note.number">{{note.name}}</option>
						</select>
						<label for="selectKey">Select key</label>
					</div>
					<div class="input-group col-sm-6">
						<!--<chord-select></chord-select> -->
						<select v-model="selectedChord" id="selectChord" v-on:change="setActiveNotes">
							<option v-for="(halfSteps, name) in chords" v-bind:value="halfSteps">{{name}}</option>
						</select>
						<label for="selectChord">Select chord</label>
					</div>
				</div>

				<guitar v-bind:settings="settings.guitar"></guitar>
				<keyboard v-bind:settings="settings.keyboard"></keyboard>

				
			</div>
			<main-footer></main-footer> 
		</main>
	</div>
</template>

<script>
	import * as quark from 'quark-gui';
	import MainNavigation from './MainNavigation.vue';
	import MainFooter from './MainFooter.vue';
	import KeySelect from './options/KeySelect.vue';
	import ChordSelect from './options/ChordSelect.vue';
	import IntervalSelect from './options/IntervalSelect.vue';
	import Guitar from './instruments/Guitar.vue';
	import Keyboard from './instruments/Keyboard.vue';

	export default {
		name: 'app',
		components: {
			mainNavigation: MainNavigation,
			mainFooter: MainFooter,
			keySelect: KeySelect,
			chordSelect: ChordSelect,
			intervalSelect: IntervalSelect,
			guitar: Guitar,
			keyboard: Keyboard
		},
		data: function () {
			return {
				notes: require("../json/notes.json"),
				chords: require("../json/chords.json"),
				intervals: require("../json/intervals.json"),
				selectedIntervals: [0, 4, 7],
				selectedChord: {"halfSteps": [0, 4, 7], "parsedHalfSteps": [0, 4, 7]},
				selectedKey: 0,
				settings: {
					chords: require("../json/settings-chords.json"),
					guitar: require("../json/settings-guitar.json"),
					keyboard: require("../json/settings-keyboard.json")
				}
			};
		},
		methods: {
			sortNumber: function(a,b) {
				return a - b;
			},
			setActiveNotes: function () {
				var selectedHalfSteps = [];
				this.notes.forEach(function (note, index) {
					note.interval = "";
				});
				this.selectedChord.parsedHalfSteps.forEach(function (note, index) {
					this.notes[(note + this.selectedKey) % 12].interval = this.intervals[note];
				}.bind(this));
				this.selectedIntervals = this.selectedChord.parsedHalfSteps;

			},
			updateSelectedChord: function () {
				this.selectedIntervals.sort(this.sortNumber).join(',');
				var isCustomChord = true;
				for (var chordName in this.chords){
					if (chordName !== undefined){
						var is_same = this.chords[chordName].parsedHalfSteps.length == this.selectedIntervals.length && this.chords[chordName].parsedHalfSteps.every(function(element, index){
							return element === this.selectedIntervals[index];
						}.bind(this));
						if (is_same){
							this.selectedChord = this.chords[chordName];
							isCustomChord = false;
							delete this.chords["custom"];
							this.setActiveNotes();
							return;
						}
					}
				}
				if(isCustomChord){
					this.chords["custom"] = {halfSteps: this.selectedIntervals, parsedHalfSteps: this.selectedIntervals};
					this.selectedChord = this.chords["custom"];
				}
				this.setActiveNotes();
			}
		}
	}
</script>
