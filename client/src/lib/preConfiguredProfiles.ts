export interface PreConfiguredProfile {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  answers: Record<number, string>; // questionId -> optionId
}

export const preConfiguredProfiles: PreConfiguredProfile[] = [
  {
    id: "motorista",
    name: "Motorista Profissional",
    description: "Dirige longas distâncias, especialmente à noite. Prioriza visão de longe e redução de halos noturnos.",
    icon: "Car",
    answers: {
      0: "1a", // Ver bem de longe
      1: "2c", // Pouco (menos de 2h/dia)
      2: "3a", // Sim, frequentemente (dirige à noite)
      3: "4b", // Não tenho astigmatismo (CORRIGIDO: 4a->4b)
      4: "5b", // Melhor qualidade visual possível (CORRIGIDO: 5a->5b)
      5: "6a", // Sim, sou muito sensível (halos)
      6: "7b"  // Moderadamente ativo
    }
  },
  {
    id: "cirurgiao",
    name: "Cirurgião/Dentista",
    description: "Precisa de excelente visão intermediária e de perto para procedimentos médicos e cirúrgicos.",
    icon: "Stethoscope",
    answers: {
      0: "1c", // Ver bem no computador (intermediária)
      1: "2a", // Muito (mais de 6h/dia)
      2: "3b", // Ocasionalmente (dirige à noite)
      3: "4b", // Não tenho astigmatismo (CORRIGIDO: 4a->4b)
      4: "5c", // Equilíbrio entre qualidade e independência (CORRIGIDO: 5b->5c)
      5: "6b", // Um pouco sensível (halos)
      6: "7a"  // Muito ativo
    }
  },
  {
    id: "professor",
    name: "Professor/Escritor",
    description: "Trabalha intensamente com leitura, escrita e computador. Busca independência de óculos para perto.",
    icon: "BookOpen",
    answers: {
      0: "1b", // Ver bem de perto (leitura)
      1: "2a", // Muito (mais de 6h/dia)
      2: "3c", // Não dirijo ou raramente à noite
      3: "4b", // Não tenho astigmatismo (CORRIGIDO: 4a->4b)
      4: "5a", // Independência total de óculos (CORRIGIDO: 5c->5a)
      5: "6c", // Não me incomoda (halos)
      6: "7b"  // Moderadamente ativo
    }
  },
  {
    id: "aposentado",
    name: "Aposentado Ativo",
    description: "Viaja, pratica esportes e hobbies. Quer independência total de óculos em todas as distâncias.",
    icon: "Plane",
    answers: {
      0: "1d", // Ver bem em todas as distâncias
      1: "2b", // Moderado (2-6h/dia)
      2: "3b", // Ocasionalmente (dirige à noite)
      3: "4b", // Não tenho astigmatismo (CORRIGIDO: 4a->4b)
      4: "5a", // Independência total de óculos (CORRIGIDO: 5c->5a)
      5: "6c", // Não me incomoda (halos)
      6: "7a"  // Muito ativo
    }
  },
  {
    id: "astigmatismo",
    name: "Paciente com Astigmatismo",
    description: "Tem astigmatismo e precisa de correção tórica. Prioriza qualidade visual de longe.",
    icon: "Eye",
    answers: {
      0: "1a", // Ver bem de longe
      1: "2b", // Moderado (2-6h/dia)
      2: "3a", // Sim, frequentemente (dirige à noite)
      3: "4a", // Sim, tenho astigmatismo (CORRETO: 4b->4a para este perfil)
      4: "5b", // Melhor qualidade visual possível (CORRIGIDO: 5a->5b)
      5: "6a", // Sim, sou muito sensível (halos)
      6: "7b"  // Moderadamente ativo
    }
  },
  {
    id: "executivo",
    name: "Executivo/Empresário",
    description: "Trabalha com computador, reuniões e viagens. Busca equilíbrio entre qualidade e praticidade.",
    icon: "Briefcase",
    answers: {
      0: "1c", // Ver bem no computador (intermediária)
      1: "2a", // Muito (mais de 6h/dia)
      2: "3b", // Ocasionalmente (dirige à noite)
      3: "4b", // Não tenho astigmatismo (CORRIGIDO: 4a->4b)
      4: "5c", // Equilíbrio entre qualidade e independência (CORRIGIDO: 5b->5c)
      5: "6b", // Um pouco sensível (halos)
      6: "7a"  // Muito ativo
    }
  }
];
