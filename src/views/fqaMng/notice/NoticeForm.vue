<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
  
      <div class="box dp_block">
        <div class="box_section">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 18%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" class="required">Title</th>
                <td class="td_input">
                  <InputBase v-model:modelValue="dataDetail.title" id="title" required />
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">Nội Dung</th>
                <td class="td_input">
                  <QuillEditor :modules="modules" toolbar="full" @editorChange="changeEditor()"
                      ref="myEditor"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section">
          <div class="btn_area">
            <button type="button" class="button btn_xs btn_white">
              {{ t("common.list") }}
            </button>
            <button type="button" class="button btn_xs btn_blue">
              {{ t("common.save") }}
            </button>
            <button type="button" class="button btn_xs btn_blue">
              {{ t("common.delete") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useAlert, useConfirm } from "@/components/common/composables/useAlert";
  import InputBase from "@/components/common/input/InputBase.vue";
import { UP_CD_SITE, UP_CD_USE_YN } from "@/constants/common.const";
import router from "@/router";
import { SCREEN } from "@/router/screen";
  import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";
import { getDataDetail, removeData, saveData } from "@/stores/fqaMng/notice/noticeMng.service";
import { AdNoticeDetailDTO, AdNoticeReq } from "@/stores/fqaMng/notice/noticeMng.type";
import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from 'quill-image-uploader'
  
  const { t } = useI18n();
  const store = commonStore();
  const alert = useAlert();
  const confirm = useConfirm();
  
  const id = ref<string>();
  
  const pageTitle = ref("Quản Lý Thông Báo");
  const breadcrumbItems = ref([
    { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
  ]);
  const myEditor = ref()

  const modules = ref({
        name: "imageUploader",
        module: ImageUploader,
        options: {
          upload: (file: any) => {
            return new Promise((resolve, reject) => {
              if (!file) {
                reject("Upload failed");
              } else {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('category', 'MEETING_REPORT_EDITER')
                formData.append('orgName', 'MEETING_REPORT_EDITER')
                formData.append('sectionName', 'MEETING_REPORT_EDITER')
                uploadFileEditor(formData)
                  .then((res) => {
                    resolve(res.data.data.urlFile)
                  })
                  .catch((err) => {
                    reject('Upload failed')
                  })


              }
            });
          },
        },
      })

  const dataDetail = ref<AdNoticeDetailDTO>({
    noticeSeq: "",
    content: "",
    postCd: "",
    readCnt: 0,
    roleId: "",
    title: "",
    topFixCd: "",
  });
  
onBeforeMount(async () => {
  store.setLoading(true);

  id.value = window.history.state.id;
  if (id.value)
    await getDataDetail(id.value).then((res) => {
      dataDetail.value = res.data.data;
    });

  await getListCodeMng({ upCdIdList: [UP_CD_USE_YN, UP_CD_SITE] }).then(
    (res) => {
      // radioUseYn.value = res.data.data.filter(
      //   (item: CodeMngModel) => item.upCdId == UP_CD_USE_YN
      // );
      // listSiteType.value = res.data.data.filter(
      //   (item: CodeMngModel) => item.upCdId == UP_CD_SITE
      // );

      // radioUseYn.value?.unshift({
      //   cdId: "",
      //   cdNm: t("common.select"),
      //   upCdId: UP_CD_USE_YN,
      // });
      // listSiteType.value?.unshift({
      //   cdId: "",
      //   cdNm: t("common.select"),
      //   upCdId: UP_CD_USE_YN,
      // });
    }
  );
  store.setLoading(false);
});

const back = () => {
  router.push({ path: SCREEN.menuManagement.path });
};

const onSave = async () => {
  if (store.check) {
    alert(
      t("common.messageValidateRequired"),
      t("common.alertTitle"),
      () => {}
    );
    return;
  }
  confirm(
    t("common.message.confirmSave"),
    t("common.confirmTitle"),
    async () => {
      const dataSave = {
        ...dataDetail.value,
      } as AdNoticeReq;
      await saveData(dataSave).then((res) => {
        alert(t("common.message.saveSuccess"), t("common.alertTitle"), () => {
          back();
        });
      });
    }
  );
};

const onRemove = async () => {
  confirm(
    t("common.message.confirmDelete"),
    t("common.confirmTitle"),
    async () => {
  if (id.value) {
    await removeData(id.value).then((res) => {
        alert(t("common.message.deleteSuccess"), t("common.alertTitle"), () => {
          back();
        });
    });
  }
    }
  );
};
const changeEditor = () => {
      // Get content
      let content = myEditor.value.getHTML().toString().replace('<p><br></p>', '');
      console.log(content);
      
    }
  </script>
  