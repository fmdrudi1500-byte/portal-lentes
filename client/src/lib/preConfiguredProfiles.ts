import type { QuizAnswer } from "@/pages/Quiz";

export interface PreConfiguredProfile {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  answers: Record<number, QuizAnswer>; // 0-based question index → answer
}

/**
 * Six pre-configured patient profiles.
 * Questions (0-based index):
 *  0  — escala 0-10 (perto importance)
 *  1  — opcoes: 0=Frequentemente, 1=Raramente  (night driving)
 *  2  — binario  (digital >4h)
 *  3  — binario  (precision hobbies)
 *  4  — binario  (active sports)
 *  5  — binario  (accepts halos)
 *  6  — binario  (contrast/color profession)
 *  7  — opcoes: 0=Sim, 1=Não, 2=Não sei  (astigmatism)
 *  8  — binario  (medical alert: glaucoma/diabetes/AMD)
 *  9  — opcoes: 0=Perfeccionista, 1=Adaptável  (personality)
 *  10 — binario  (dim light environments)
 *  11 — opcoes: 0=Conveniência, 1=Qualidade  (final priority)
 */

export const preConfiguredProfiles: PreConfiguredProfile[] = [
  {
    id: "motorista",
    name: "Motorista Profissional",
    description:
      "Dirige longas distâncias, especialmente à noite. Prioriza visão de longe e redução de halos noturnos.",
    icon: "Car",
    answers: {
      0: { type: "escala", value: 3 },         // perto: baixa importância
      1: { type: "opcoes", optionIndex: 0 },    // noite: Frequentemente
      2: { type: "binario", value: false },      // digital: Não
      3: { type: "binario", value: false },      // hobbies: Não
      4: { type: "binario", value: false },      // esportes: Não
      5: { type: "binario", value: false },      // aceita halos: Não
      6: { type: "binario", value: false },      // contraste: Não
      7: { type: "opcoes", optionIndex: 1 },    // astigmatismo: Não
      8: { type: "binario", value: false },      // saúde: Não
      9: { type: "opcoes", optionIndex: 0 },    // personalidade: Perfeccionista
      10: { type: "binario", value: false },     // baixa luz: Não
      11: { type: "opcoes", optionIndex: 1 }    // prioridade: Qualidade
    }
  },
  {
    id: "cirurgiao",
    name: "Cirurgião/Dentista",
    description:
      "Precisa de excelente visão intermediária e de perto para procedimentos médicos e cirúrgicos.",
    icon: "Stethoscope",
    answers: {
      0: { type: "escala", value: 8 },          // perto: alta importância
      1: { type: "opcoes", optionIndex: 1 },    // noite: Raramente
      2: { type: "binario", value: true },       // digital: Sim
      3: { type: "binario", value: true },       // hobbies precisão: Sim (trabalho cirúrgico)
      4: { type: "binario", value: false },      // esportes: Não
      5: { type: "binario", value: true },       // aceita halos: Sim
      6: { type: "binario", value: true },       // contraste: Sim (procedimentos)
      7: { type: "opcoes", optionIndex: 1 },    // astigmatismo: Não
      8: { type: "binario", value: false },      // saúde: Não
      9: { type: "opcoes", optionIndex: 1 },    // personalidade: Adaptável
      10: { type: "binario", value: false },     // baixa luz: Não
      11: { type: "opcoes", optionIndex: 0 }    // prioridade: Conveniência
    }
  },
  {
    id: "professor",
    name: "Professor/Escritor",
    description:
      "Trabalha intensamente com leitura, escrita e computador. Busca independência de óculos para perto.",
    icon: "BookOpen",
    answers: {
      0: { type: "escala", value: 9 },          // perto: muito alta
      1: { type: "opcoes", optionIndex: 1 },    // noite: Raramente
      2: { type: "binario", value: true },       // digital: Sim
      3: { type: "binario", value: true },       // hobbies: Sim (escrita/leitura)
      4: { type: "binario", value: false },      // esportes: Não
      5: { type: "binario", value: true },       // aceita halos: Sim
      6: { type: "binario", value: false },      // contraste: Não
      7: { type: "opcoes", optionIndex: 1 },    // astigmatismo: Não
      8: { type: "binario", value: false },      // saúde: Não
      9: { type: "opcoes", optionIndex: 1 },    // personalidade: Adaptável
      10: { type: "binario", value: false },     // baixa luz: Não
      11: { type: "opcoes", optionIndex: 0 }    // prioridade: Conveniência
    }
  },
  {
    id: "aposentado",
    name: "Aposentado Ativo",
    description:
      "Viaja, pratica esportes e hobbies. Quer independência total de óculos em todas as distâncias.",
    icon: "Plane",
    answers: {
      0: { type: "escala", value: 8 },          // perto: alta
      1: { type: "opcoes", optionIndex: 1 },    // noite: Raramente
      2: { type: "binario", value: false },      // digital: Não
      3: { type: "binario", value: false },      // hobbies: Não
      4: { type: "binario", value: true },       // esportes: Sim
      5: { type: "binario", value: true },       // aceita halos: Sim
      6: { type: "binario", value: false },      // contraste: Não
      7: { type: "opcoes", optionIndex: 1 },    // astigmatismo: Não
      8: { type: "binario", value: false },      // saúde: Não
      9: { type: "opcoes", optionIndex: 1 },    // personalidade: Adaptável
      10: { type: "binario", value: true },      // baixa luz: Sim (restaurantes)
      11: { type: "opcoes", optionIndex: 0 }    // prioridade: Conveniência
    }
  },
  {
    id: "astigmatismo",
    name: "Paciente com Astigmatismo",
    description:
      "Tem astigmatismo e precisa de correção tórica. Prioriza qualidade visual e contraste nítido.",
    icon: "Eye",
    answers: {
      0: { type: "escala", value: 5 },          // perto: moderada
      1: { type: "opcoes", optionIndex: 0 },    // noite: Frequentemente
      2: { type: "binario", value: false },      // digital: Não
      3: { type: "binario", value: false },      // hobbies: Não
      4: { type: "binario", value: false },      // esportes: Não
      5: { type: "binario", value: false },      // aceita halos: Não (sensível)
      6: { type: "binario", value: false },      // contraste: Não
      7: { type: "opcoes", optionIndex: 0 },    // astigmatismo: Sim → trigger_torica
      8: { type: "binario", value: false },      // saúde: Não
      9: { type: "opcoes", optionIndex: 0 },    // personalidade: Perfeccionista
      10: { type: "binario", value: false },     // baixa luz: Não
      11: { type: "opcoes", optionIndex: 1 }    // prioridade: Qualidade
    }
  },
  {
    id: "executivo",
    name: "Executivo/Empresário",
    description:
      "Trabalha com computador, reuniões e viagens. Busca equilíbrio entre qualidade e praticidade.",
    icon: "Briefcase",
    answers: {
      0: { type: "escala", value: 7 },          // perto: alta
      1: { type: "opcoes", optionIndex: 1 },    // noite: Raramente
      2: { type: "binario", value: true },       // digital: Sim
      3: { type: "binario", value: false },      // hobbies: Não
      4: { type: "binario", value: false },      // esportes: Não
      5: { type: "binario", value: true },       // aceita halos: Sim
      6: { type: "binario", value: false },      // contraste: Não
      7: { type: "opcoes", optionIndex: 1 },    // astigmatismo: Não
      8: { type: "binario", value: false },      // saúde: Não
      9: { type: "opcoes", optionIndex: 1 },    // personalidade: Adaptável
      10: { type: "binario", value: false },     // baixa luz: Não
      11: { type: "opcoes", optionIndex: 0 }    // prioridade: Conveniência
    }
  }
];
