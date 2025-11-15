import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { preConfiguredProfiles, type PreConfiguredProfile } from "@/lib/preConfiguredProfiles";
import { Car, Stethoscope, BookOpen, Plane, Eye, Briefcase, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  Stethoscope,
  BookOpen,
  Plane,
  Eye,
  Briefcase
};

interface ProfileSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProfile: (profile: PreConfiguredProfile) => void;
}

export default function ProfileSelector({ open, onOpenChange, onSelectProfile }: ProfileSelectorProps) {
  const [selectedProfile, setSelectedProfile] = useState<PreConfiguredProfile | null>(null);

  const handleSelectProfile = (profile: PreConfiguredProfile) => {
    setSelectedProfile(profile);
  };

  const handleConfirm = () => {
    if (selectedProfile) {
      onSelectProfile(selectedProfile);
      onOpenChange(false);
      setSelectedProfile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-blue-600" />
            Perfis Pré-Configurados
          </DialogTitle>
          <DialogDescription>
            Selecione um perfil de paciente para testar rapidamente as recomendações sem preencher o questionário completo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {preConfiguredProfiles.map((profile) => {
            const IconComponent = iconMap[profile.icon];
            const isSelected = selectedProfile?.id === profile.id;

            return (
              <Card
                key={profile.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-blue-600 bg-blue-50" : ""
                }`}
                onClick={() => handleSelectProfile(profile)}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${isSelected ? "bg-blue-600" : "bg-blue-100"}`}>
                      <IconComponent className={`w-6 h-6 ${isSelected ? "text-white" : "text-blue-600"}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{profile.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {profile.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setSelectedProfile(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedProfile}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Usar Perfil Selecionado
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
