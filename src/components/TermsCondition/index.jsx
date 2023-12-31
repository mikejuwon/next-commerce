import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import languageModel from "../../../utils/languageModel";
import { useEffect, useState } from "react";

export default function TermsCondition({ datas }) {
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  const { terms_conditions } = datas;
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: langCntnt && langCntnt.home, path: "/" },
              {
                name: langCntnt && langCntnt.Term_and_Conditions,
                path: "/terms-condition",
              },
            ]}
            title={langCntnt && langCntnt.Term_and_Conditions}
          />
        </div>
        <div className="w-full pb-[120px]">
          <div
            className="container-x mx-auto content-body"
            dangerouslySetInnerHTML={{
              __html: terms_conditions.terms_and_condition,
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
