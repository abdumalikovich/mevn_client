<template>
    <div class="widget">
        <transition name="menu-animation">
            <div class="menu" v-if="Form.Menu" @keydown.esc="something_in_your_methods">
                <a class="close-menu" @click="СloseForms()"></a>
                <div class="wrapper menu-links">
                    <a @click="СloseForms()" target="_blank" href="https://madad.studio">{{$t('links.madad')}}</a>
                    <a @click="СloseForms()" href="/#courses">{{$t('links.courses')}}</a>
                    <a @click="СloseForms()" href="/#reviews">{{$t('links.video')}}</a>
                    <a @click="СloseForms(), OpenForm(['Application'])" href="#">{{$t('links.video')}}</a>
                    <a @click="СloseForms()" target="_blank" href="https://t.me/weprouz_bot">{{$t('links.telegram')}}</a>
                    <a @click="СloseForms()" href="/students">{{$t('links.students_work')}}</a>
                </div>
                <div class="footer">
                    <div class="side elements-pc side-left bolder menu-footer">
                        <div class="side-left-left"><span>© 2021 Wepro. Все права защищены.</span></div>
                        <div class="side-left-right">
                            <span><a href="tel:+998 90 197 71-00">+998 90 197 71-00</a> | <a href="mailto:hi@wepro.uz">hi@wepro.uz</a></span>
                        </div>
                    </div>
                    <div class="side right-side t-20 menu-social">
                        <a target="_blank" href="https://www.instagram.com/wepro.uz/">Instagram</a>
                        <a target="_blank" href="https://t.me/weprouz">Telegram</a>
                        <a target="_blank" href="https://www.tiktok.com/">TikTok</a>
                        <a target="_blank" href="https://www.youtube.com/channel/UCF2_hjZ9xENm01x4gPoLakg">YouTube</a>
                        <a target="_blank" href="https://www.facebook.com/wepro.uz">Facebook</a>
                        <!-- <a href="#">Behance</a> -->
                    </div>
                </div>
            </div>
        </transition>
        <transition name="bottom-top">
            <div class="widget-def widget-video" v-if="Form.Video">
                <iframe src="https://www.youtube.com/embed/sffj_Y1arJI?autoplay=1&mute=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </transition>
        <transition name="bottom-top">
            <div class="widget-def widget-success" v-if="Form.Success">
                <div class="close" @click="СloseForms()">
                    <img src="../../../public/images/icons/close-b.svg" alt="">
                </div>
				<div class="heading padding-sides">
					<span class="h4">Спасибо. Мы получили заявку и ответим тебе в течение дня!</span>
				</div>
                <div class="wrapper padding-sides">
					<p class="t-20 bolder">Что дальше?</p>
                    <ul>
                        <li class="note">Мы позвоним тебе и уточним когда можно будет подойти в центр</li>
                        <li class="note">Ответим на все имеющиеся у тебя вопросы</li>
                        <li class="note">Поговорим о профессии, которая тебя интересует</li>
                        <li class="note">При необходимости - подберем удобный график обучения</li>
                    </ul>
                    <p class="note t-black">Обычно, мы отвечаем в течение дня. До встречи у нас, твой «Wepro» :)</p>

                    <div class="btns">
                        <button @click="СloseForms()">Закрыть</button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="bottom-top">
            <div class="widget-def widget-success" v-if="Error.Status">
                <div class="close" @click="СloseForms()">
                    <img src="../../../public/images/icons/close-b.svg" alt="">
                </div>
				<div class="heading padding-sides">
					<span class="h2">{{ Error.Text }}</span>
				</div>
                <div class="wrapper padding-sides">
					<a href="tel:+998 90 197 71-00">
                        <p class="t-20">Пожалуйста, попробуйте еще раз или перезвоните по номеру <b class="blue">+998 90 197 71-00</b></p>
                    </a>
                    
                    <div class="btns">
                        <button @click="СloseForms()">Закрыть</button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="bottom-top">
            <div class="widget-def widget-application" v-if="Form.Application">
                <div class="close" @click="СloseForms()">
                    <img src="../../../public/images/icons/close-b.svg" alt="">
                </div>
                <form class="vertical padding-sides" @submit="Add({service: 'Applications'})">
                    <div class="heading">
                        <span class="h2">{{$t('buttons.course')}}</span>
                    </div>
                    <input type="text" name="time" hidden :value="new Date().toLocaleTimeString()">
                    <input type="text" name="date" hidden :value="new Date().toLocaleDateString()">

                    <label>
                        Ваше имя
                        <input name="name" class="white" v-model="form.name" type="text" placeholder="Введите свое имя">
                    </label>
                    <label>
                        Введите номер телефона
                        <input type="phone" name="phone" v-model="form.phone" class="white">
                    </label>
                    <label>
                        Выберите курс
                        <select name="course" class="white">
                            <option :value="item.id" v-for="item of AllData.Course" :key="item.key">{{item.title}}</option>
                        </select>
                    </label>
                    <label>
                        Предпочитаемый язык обучения
                        <select name="language" class="white">
                            <option value="russian">На русском языке</option>
                            <option value="uzbek">Ozbek tilida</option>
                        </select>
                    </label>
                    <div class="doc">
                        <button :disabled="!validation">Отправить заявку</button>
                        <p class="note">Нажимая на кнопку, я соглашаюсь на обработку персональных данных</p>
                    </div>
                </form>
            </div>
            <div class="widget-def widget-application" v-if="Form.FreeLesson">
                <div class="close" @click="СloseForms()">
                    <img src="../../../public/images/icons/close-b.svg" alt="">
                </div>
                <form class="vertical padding-sides" @submit="Add({service: 'FreeLesson'})">
                    <div class="heading">
                        <span class="h2">Посетить бесплатный урок</span>
                    </div>
                    <input type="text" name="time" hidden :value="new Date().toLocaleTimeString()">
                    <input type="text" name="date" hidden :value="new Date().toLocaleDateString()">

                    <label>
                        Ваше имя
                        <input name="name" class="white" v-model="form.name" type="text" placeholder="Введите свое имя">
                    </label>
                    <label>
                        Введите номер телефона
                        <input type="phone" name="phone" v-model="form.phone" class="white">
                    </label>
                    <label>
                        Выберите курс
                        <select name="course" class="white">
                            <option :value="item.id" v-for="item of AllData.Course" :key="item.key">{{item.title}}</option>
                        </select>
                    </label>
                    <div class="doc">
                        <button :disabled="!validation">Отправить заявку</button>
                        <p class="note">Нажимая на кнопку, я соглашаюсь на обработку персональных данных</p>
                    </div>
                </form>
            </div>
            <div class="widget-def widget-application" v-if="Form.OpenLessons">
                <div class="close" @click="СloseForms()">
                    <img src="../../../public/images/icons/close-b.svg" alt="">
                </div>
                <form class="vertical padding-sides" @submit="Add({service: 'App_OpenLessons'})">
                    <div class="heading">
                        <span class="h2">Записаться на открытый урок</span>
                        <p>На открытых уроках мы рассказываем о себе, наших курсах и всей информации, касающейся обучения. Мероприятие проходит в формате презентаций и ответов на вопросы по обучению.</p>
                    </div>
                    <input type="text" name="time" hidden :value="new Date().toLocaleTimeString()">
                    <input type="text" name="date" hidden :value="new Date().toLocaleDateString()">

                    <label>
                        Ваше имя
                        <input name="name" class="white" v-model="form.name" type="text" placeholder="Введите свое имя">
                    </label>
                    <label>
                        Введите номер телефона
                        <input type="phone" name="phone" v-model="form.phone" class="white">
                    </label>
                    <label>
                        Выберите курс
                        <select name="course" class="white">
                            <option :value="item.id" v-for="item of AllData.Course" :key="item.key">{{item.title}}</option>
                        </select>
                    </label>
                    <div class="doc">
                        <button :disabled="!validation">Отправить заявку</button>
                        <p class="note">Нажимая на кнопку, я соглашаюсь на обработку персональных данных</p>
                    </div>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
// import InputMask from 'vue-input-mask';
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            form: {
                phone: '+998 ',
                name: ''
            }      
        }
    },
	computed: {
		...mapGetters([
			'Form',
			'Error',
			'AllData',
		]),
        validation: function() {
            if(this.form.phone.length >= 12 && this.form.name.length > 2) return true
            return false
        }
	},
	methods: {
        ...mapActions([
            'Add',
            'OpenForm',
            'ShowForm',
            'СloseForms',
        ])
    },
    components: {
        // InputMask
    }
}
</script>

<style>
.widget-success svg {
    width: 56px;
    height: 56px;
}
</style>