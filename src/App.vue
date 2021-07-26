<template>
	<div id="app">
		<layoutWidget/>

		<transition name="fade">
			<div @click="СloseForms()" class="def-bg" v-if="Form.BlurredBg"></div>
		</transition>

		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>

		<transition name="fade" mode="out-in">
			<div class="cookies" v-if="status_ad == true">
				<span>Пользуясь нашим сайтом, вы соглашаетесь <br> с тем, что мы используем cookies</span>
				<button @click="closeAd()">Окей</button>
			</div>
		</transition>
	</div>
</template>

<script>
import config from '../vue.config'
import layoutWidget from './components/layouts/widgets'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'app',
    data() {
        return {
            status_ad: true
        }
    },
	computed: {
		...mapGetters([
			'Form',
		])
	},
	methods: {
        ...mapActions([
            'СloseForms',
        ]),
        closeAd() {
            localStorage.setItem('ad', 0)
            this.status_ad = false
        }
    },
    created() {
        if(localStorage.getItem('ad') == 0) this.status_ad = false
    },
	components: {
		proxy: config.devServer.proxy,
		layoutWidget
	}
}
</script>

<style>
@import '../public/css/style.css';

</style>
