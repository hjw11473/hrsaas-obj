<template>
    <el-dialog title="查看二维码" :visible.sync="dialogFormVisibless" :before-close="cloes">
        <!-- 表单 -->
        <canvas id="canvas"></canvas>
    </el-dialog>
</template>


<script>
export default {
    props: {
        dialogFormVisibless: {
            type: Boolean,
            default: false
        },
        row: {
            type: Object,
            default:()=>{}
        }
    },
    methods: {
        // 关闭窗口
        cloes() {
            this.$emit("update:dialogFormVisibless", false);
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>