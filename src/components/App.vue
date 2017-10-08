<template>
	<div id="app">
		<main-navigation></main-navigation>
		<main id="mainContent">
			<div class="main-content">
				<!--<interval-select></interval-select> -->
				
				<label for="selectChord">Select Instrument</label>
				<guitar v-show="selectedInstrument == 'guitar'" v-bind:settings="settings.guitar"></guitar>
				<keyboard v-show="selectedInstrument == 'keyboard'" v-bind:settings="settings.keyboard"></keyboard>
				<div v-show="alternativeChords.length">
					<span>Similar chords:</span>
					<ul style="margin: 0; padding: 0 0 0 20px">
						<li v-for="alternativeChord in alternativeChords">
							{{alternativeChord.note.name}}{{alternativeChord.chordName}}
						</li>
					</ul>
				</div>
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
		keyboard: Keyboard,
	},
	data: function () {
		return {
			notes: require("../json/notes.json"),
			chords: require("../json/chords.json"),
			intervals: require("../json/intervals.json"),
			selectedHalfSteps: [0, 4, 7],
			selectedChord: {"halfSteps": [0, 4, 7], "parsedHalfSteps": [0, 4, 7]},
			selectedChordName: "",
			alternativeChords: [],
			selectedKey: 0,
			selectedKeyName: "",
			selectedInstrument: 'guitar',
			selectedLabel: 'key',
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
		setAlternativeChords: function () {
			let alternativeChords = [];
			for (var keyIndex in this.notes) {
				if (keyIndex != this.selectedKey){
					let relativeKeyIndex = keyIndex-this.selectedKey;
					let relativeParsedHalfSteps = [];
					this.selectedChord.parsedHalfSteps.forEach(function(parsedHalfStep){
						let relativeParsedHalfStep = parsedHalfStep-relativeKeyIndex;
						relativeParsedHalfStep = relativeParsedHalfStep >= 0 ? relativeParsedHalfStep : relativeParsedHalfStep + 12;
						relativeParsedHalfSteps.push(relativeParsedHalfStep % 12);
					});
					relativeParsedHalfSteps.sort(this.sortNumber).join(',');

					for (var chordName in this.chords){
						var is_same = this.chords[chordName].parsedHalfSteps.length == relativeParsedHalfSteps.length && this.chords[chordName].parsedHalfSteps.every(function(element, index){
							return element === relativeParsedHalfSteps[index];
						}.bind(this));
						if (is_same){
							alternativeChords.push({
								note: this.notes[keyIndex],
								chord: this.chords[chordName],
								chordName: chordName
							});
						}
					}
				}
			}
			this.alternativeChords = alternativeChords;
		},
		setActiveNotes: function (event) {
			if (event !== undefined){ // Changed from selectlist
				let targetId = event.target.id;
				if (targetId == "selectKey"){
					this.selectedKeyName = event.target.options[event.target.selectedIndex].text;
				}else if(targetId == "selectChord"){
					this.selectedChordName = event.target.options[event.target.selectedIndex].text;
				}
			}
			var selectedHalfSteps = [];
			this.notes.forEach(function (note, index) {
				let relativeNoteNumber = note.number - this.selectedKey + 12;
				note.interval = this.intervals[relativeNoteNumber % 12];
				note.selected = false;
			}.bind(this));
			this.selectedChord.parsedHalfSteps.forEach(function (note, index) {
				this.notes[(note + this.selectedKey) % 12].selected = true;
			}.bind(this));
			this.selectedHalsSteps = this.selectedChord.parsedHalfSteps;
			this.setAlternativeChords();
		},
		updateSelectedChord: function () {
			this.selectedHalfSteps.sort(this.sortNumber).join(',');
			var isCustomChord = true;
			for (var chordName in this.chords){
				if (chordName !== undefined){
					var is_same = this.chords[chordName].parsedHalfSteps.length == this.selectedHalfSteps.length && this.chords[chordName].parsedHalfSteps.every(function(element, index){
						return element === this.selectedHalfSteps[index];
					}.bind(this));
					if (is_same){
						this.selectedChordName = chordName;
						this.selectedKeyName = this.notes[this.selectedKey].name;
						this.selectedChord = this.chords[chordName];
						isCustomChord = false;
						delete this.chords["custom"];
						this.setActiveNotes();
						return;
					}
				}
			}
			if(isCustomChord){
				this.chords["custom"] = {halfSteps: this.selectedHalfSteps, parsedHalfSteps: this.selectedHalfSteps};
				this.selectedChordName = "custom chord";
				this.selectedChord = this.chords["custom"];
			}
			this.setActiveNotes();
		}
	}
}
</script>
