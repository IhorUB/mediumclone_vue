<template>
    <div>
        <mcv-loading v-if="isLoading"/>
        <mcv-error-message v-if="error" :message="error"/>
        <div v-if="error">{{ error }}</div>

        <div v-if="feed">
            <div class="article-preview"
                 v-for="(article, index) in feed.articles" :key="index">
                <div class="article-meta">
                    <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                        <img :src="article.author.image" :alt="article.author.username">
                    </router-link>
                </div>
                <div class="info">
                    <router-link class="author"
                                 :to="{name: 'userProfile', params: {slug: article.author.username}}">
                        {{ article.author.username }}
                    </router-link>
                    <span class="date">{{ article.createdAt }}</span>
                </div>
                <div class="pull-xs-right">ADD TO FAVOURITE</div>
                <router-link class="preview-link"
                             :to="{name: 'article', params: {slug: article.slug}}">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    <mcv-tag-list :tag-list="article.tagList"/>
                </router-link>
            </div>
            <mcv-pagination
                    :total="feed.articlesCount"
                    :limit="limit"
                    :current-page="currentPage"
                    :url="baseUrl"/>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import McvPagination from '@/components/Pagination'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'
import {limit} from '@/helpers/variables'
import {stringify, parseUrl} from 'query-string'
export default {
    name: "McvFeed", props: {
        apiUrl: {
            type: String, required: true
        }
    }, data() {
        return {
            limit, url: '/'
        }
    }, components: {
        McvPagination, McvLoading, McvErrorMessage, McvTagList
    }, computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            error: state => state.feed.error
        }), currentPage() {
            return Number(this.$route.query.page || '1')
        }, baseUrl() {
            return this.$route.path
        },
        offset() {
            return this.currentPage * limit - limit
        }
    }, watch: {
        currentPage() {
            this.fetchFeed()
        }
    }, mounted() {
        this.fetchFeed()
    }, methods: {
        fetchFeed() {
            const parsedUrl = parseUrl(this.apiUrl)
            const stringifiedParams = stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query
            })
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
        }
    }
}
</script>

<style scoped>

</style>