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
                <th scope="row" class="required">Tên Menu</th>
                <td class="td_input">
                  <InputBase id="nm" required />
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
  import { commonStore } from "@/stores/common";
  
  const { t } = useI18n();
  const store = commonStore();
  const alert = useAlert();
  const confirm = useConfirm();
  
  const id = ref<string>();
  
  const pageTitle = ref("Trả Lời Câu Hỏi");
  const breadcrumbItems = ref([
    { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
  ]);
  </script>
  