<template>
	<div v-html="htmlContent"></div>
</template>

<script>
	import * as quark from 'quark-gui';

	 export default {
        name: 'MainNavigation',
        data () {
            return {
                htmlContent: "",
                header: {}
            }
        },
        created: function () {
            let header = {
                id: 'main-header',
                theme: 'dark',
                logo: {
                    image: {
                        src: "", //require('../../images/svg/chord-finder-logo-white.svg'),
                        alt: 'ChordFinder logo'
                    },
                    url: "/dashboard"
                },
                primaryNavigation: {
                    id: "primary-navigation",
                    listItems: []
                },
                sidebar: {
                    sidebarNavigation: {
                        listItems: [
                            {
                                name: "About",
                                link: "",
                                iconClass: "fa fa-info-circle"
                            },
                            {
                                name: "Developers",
                                link: "",
                                iconClass: "fa fa-code"
                            },
                            {
                                name: "Send feedback",
                                link: "",
                                iconClass: "fa fa-comment"
                            }
                        ]
                    }
                }
            };
            this.header = header;
            this.htmlContent = quark.Organisms.Global.Header.getModule(this.header);
        }
    }
</script>
