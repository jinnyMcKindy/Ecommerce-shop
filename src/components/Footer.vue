<template>
	<footer class="footer footer-border menu-light">
		<div class="container footer-wrapper">
			<router-link class="nav-link nav-link--light" to="/politics">Политика</router-link>
			<router-link class="nav-link nav-link--light" to="/politics">Доставка</router-link>
			<router-link class="nav-link nav-link--light" to="/politics">Возврат</router-link>
			<router-link class="nav-link nav-link--light" to="/politics">Контакты</router-link>
		</div>
		<small>
			Персональные данные посетителей сайта обрабатываются в соответствии  <router-link to="/politics">с официальной политикой.</router-link> 
			Сайт *** носит информационный характер и не является публичной офертой, определяемой положениями Статьи 437 ГК РФ.
		</small>
	</footer>
</template>
<script>
	
</script>
<style type="less">
.footer {
    padding: 0;
    position: statick;
    bottom: 0;
    width: 100%;
}
.footer-border {
	border-top: 1px solid #e9e9e9;
}
.custom-list-group .list-group-item {
	background: none;
	border: none;
	padding: 0.5em 0.25em;
}
.footer-wrapper {
	display: flex;
	justify-content: center;
}
</style>