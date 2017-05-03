var app2 = new Vue({
    el: '#sign',
    data: {
        user: {
            name: '',
            id: '',
            phone: '',
            img_path: '',
            meg: ''
        }
    },
    mounted: function() {
        var url = window.location.href;
        //console.log(url.split('/'));
        var uid = url.split('/').reverse()[0];
        //console.log(uid);
        var data = {};
        data.uid = uid;
        //console.log(this.user,'hear');
        var data_out = {};
        $.ajax({
            type: "post",
            url: "/api/student/get/",
            data: data,
            async: false,
            success: function(data) {
                if (data.flag) {
                    data_out = data.data;
                } else {
                    alert("您尚未注册");
                    window.location = '/';
                }

            }
        });
        this.user = data_out;
        $(function() {
            var url = window.location.href;
            var uid = url.split('/').reverse()[0];
            $("#fileupload").attr("data-url", "/api/student/img/" + uid + "/" + app2.user.id);
            $('#fileupload').fileupload({
                // autoUpload: true,
                dataType: 'json',
                type: 'post',
                url: '/api/student/img/' + uid,
                // paramName: uid,
                add: function(e, data) {
                    data.submit();
                },
                done: function(e, data) {
                    if (data.result.flag) {
                        alert('上传成功');
                        app2.user.img_path = data.result.data.img_path;
                        $("#img").attr("src", data.result.data.img_path);
                    } else {
                        alert('上传失败', data.result.data.meg);
                    }
                }
            });
        });
    },
    methods: {
        user_change: function() {
            var url = window.location.href;
            //console.log(url.split('/'));
            var uid = url.split('/').reverse()[0];
            //console.log(uid);
            var data = {
                uid: uid,
                name: this.user.name,
                id: this.user.id,
                meg: this.user.meg,
                phone: this.user.phone,
                img_path: this.user.img_path
            };
            $.post('/api/student/change/', data, function(data) {
                if (data.flag) {
                    alert("修改成功");
                } else {

                }
            });
            return false;
        }
    }
});