import { SectionWrapper } from "../atom/SectionWrapper";
import { Project } from "./Project";
import { getListOfUrlRepositoriesUrl } from "../../lib/api-url";
import { Loader } from "../../components/atom/Loader";
import { GITHUB_USERNAME } from "../../lib/config";
import { useFetch, FETCH_STATUS } from "../../hooks/useFetch";

export const ProjectSection = () => {
  const { status, data, error } = useFetch(
    getListOfUrlRepositoriesUrl(GITHUB_USERNAME)
  );

  const ProjectContent = () => {
    switch (status) {
      case FETCH_STATUS.IDLE:
        return <span>'Vos projets ici'</span>;
      case FETCH_STATUS.PENDING:
        return <Loader />;
      case FETCH_STATUS.RESOLVED:
        return data.map((project) => (
          <Project key={project.name} {...project} />
        ));
      case FETCH_STATUS.REJECTED:
        return <span>{error.description}</span>;
    }
  };

  return (
    <SectionWrapper title="Projects">
      <div className="flex flex-wrap justify-center gap-8">
        <ProjectContent />
      </div>
    </SectionWrapper>
  );
};
