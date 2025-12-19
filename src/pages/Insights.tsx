import { PageHeader } from "@/components/PageHeader";
import { DataValidation } from "@/components/DataValidation";
import { AIRecommendations } from "@/components/AIRecommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Health Insights"
        description="AI-powered analysis and smart data validation"
      />
      <div className="container max-w-6xl pt-32 pb-8">
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="validation">Data Validation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations">
            <AIRecommendations />
          </TabsContent>
          
          <TabsContent value="validation">
            <DataValidation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insights;
