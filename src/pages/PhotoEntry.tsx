import { PhotoDataEntry } from "@/components/PhotoDataEntry";
import { PageHeader } from "@/components/PageHeader";

const PhotoEntry = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Quick Entry"
        description="Snap a photo of your lab results and we'll do the rest"
      />
      <div className="container max-w-4xl pt-32 pb-8">
        <PhotoDataEntry />
      </div>
    </div>
  );
};

export default PhotoEntry;
