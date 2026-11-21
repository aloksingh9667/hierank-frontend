import {
  Award, BarChart3, BookOpen, Briefcase, Building2, Cloud, Code2, Coffee, Compass, Cpu, Database, Globe, GraduationCap,
  Handshake, Lightbulb, LineChart, Library, Megaphone, MonitorPlay, Rocket, ShieldCheck, TrainFront, Users, BrainCircuit, Star,
} from 'lucide-react';

const map = {
  'award': Award, 'bar-chart-3': BarChart3, 'book-open': BookOpen, 'briefcase': Briefcase, 'building-2': Building2, 'cloud': Cloud,
  'code-2': Code2, 'coffee': Coffee, 'compass': Compass, 'cpu': Cpu, 'database': Database, 'globe': Globe, 'graduation-cap': GraduationCap,
  'handshake': Handshake, 'lightbulb': Lightbulb, 'line-chart': LineChart, 'library': Library, 'megaphone': Megaphone,
  'monitor-play': MonitorPlay, 'rocket': Rocket, 'shield-check': ShieldCheck, 'train-front': TrainFront, 'users': Users,
  'brain-circuit': BrainCircuit, 'star': Star,
};

// Resolve an icon name stored in MongoDB to a lucide component
export const getIcon = (name, fallback = Star) => map[name] || fallback;
