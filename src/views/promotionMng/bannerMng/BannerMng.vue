<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>Tiêu Đề</p>
              <InputBase v-model:modelValue="dataSearch.bannerNm" id="bannerNm" />
            </li>
            <li>
              <p>URL</p>
              <InputBase
                v-model:modelValue="dataSearch.url"
                id="url"
              />
            </li>
            <li>
              <p>Thể Loại</p>
              <InputBase
                v-model:modelValue="dataSearch.typeCd"
                id="typeCd"
              />
            </li>
            <li>
              <p>Trạng Thái</p>
              <InputBase v-model:modelValue="dataSearch.useYn" id="useYn" />
            </li>
          </ul>
        </div>
        <div class="btn_group btn_end">
          <button
            class="button btn_xs btn_lightgray btn_responsive"
            @click="clearFormSearch()"
          >
            {{ t("common.reset") }}
          </button>
          <button
            class="button btn_xs btn_blue btn_responsive"
            @click="searchFormData()"
          >
            {{ t("common.search") }}
          </button>
        </div>
      </div>
    </div>

    <div class="box dp_block">
      <div class="box_inner">
        <GridComponentV2
          :rowData="data"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div>
              <button
                type="button"
                class="btn_round btn_xs btn_primary mg_l10"
                @click="goActionCreate"
              >
                {{ t("common.add") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import router from "@/router";
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getPageData } from "@/stores/promotionMng/bannerMng/bannerMng.service";
import { AdBannerFilterReq, AdBannerResDTO } from "@/stores/promotionMng/bannerMng/bannerMng.type";

const { t } = useI18n();
const store = commonStore();

const pageTitle = ref("Quản Lý Role");
const breadcrumbItems = ref([
  { label: t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const totalRecord = ref(0);

const columnDefs = ref([
  {
    headerName: t("common.rowNum"),
    flex: 0.1,
    field: "rowNum",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Tiêu Đề",
    field: "title",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: goAction },
  },
  {
    headerName: "URL",
    field: "questionDate",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: "Sử Dụng",
    field: "userQuestion",
    cellStyle: {
      textAlign: "center",
    },
  },
]);

const dataSearch = ref<AdBannerFilterReq>({
  bannerNm: "",
  typeCd: "",
  url: "",
  useYn: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const radioUseYn = ref<CodeMngModel[]>();
const listSiteType = ref<CodeMngModel[]>();
const listMenuParent = ref<CodeMngModel[]>();

const data = ref([]);

onBeforeMount(async () => {
  store.setLoading(true);
//   await getListCodeMng({ upCdIdList: [UP_CD_USE_YN, UP_CD_SITE] }).then(
//     (res) => {
//       radioUseYn.value = res.data.data.filter(
//         (item: CodeMngModel) => item.upCdId == UP_CD_USE_YN
//       );
//       listSiteType.value = res.data.data.filter(
//         (item: CodeMngModel) => item.upCdId == UP_CD_SITE
//       );

//       radioUseYn.value?.unshift({
//         cdId: "",
//         cdNm: t("common.select"),
//         upCdId: UP_CD_USE_YN,
//       });
//       listSiteType.value?.unshift({
//         cdId: "",
//         cdNm: t("common.select"),
//         upCdId: UP_CD_USE_YN,
//       });
//     }
//   );
  store.setLoading(false);
});

const goActionCreate = () => {
  router.push({
    name: SCREEN.bannerMngForm.name,
    params: { mode: MODE_CREATE },
  });
};

function goAction(data: AdBannerResDTO) {
  router.push({
    name: SCREEN.bannerMngForm.name,
    params: { mode: MODE_CREATE },
    state: { id: data.bannerSeq },
  });
}

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  dataSearch.value.page = pageNumber;
  dataSearch.value.size = pagesSize;
  await getPageData(dataSearch.value).then((res) => {
    totalRecord.value = res.data.data.totalRecord;
    data.value = res.data.data.data.map(
      (item: AdBannerResDTO, index: number) => {
        item.rowNum =
          (dataSearch.value.page - 1) * dataSearch.value.size + index + 1;
        return item;
      }
    );
  });
};

const clearFormSearch = () => {
  dataSearch.value = {
    bannerNm: "",
    typeCd: "",
    url: "",
    useYn: "",
    page: 1,
    size: PAGINATION_PAGE_SIZE,
    sort: "",
  };
};

const searchFormData = () => {
  dataSearch.value.page = 1;
  fnPagination(dataSearch.value.page, dataSearch.value.size);
};
</script>
