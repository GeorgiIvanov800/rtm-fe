import { SaveSleeveRequestConditionEnum } from '@/openapi';

export const SleeveConditionDE: Record<SaveSleeveRequestConditionEnum, string> = {
  [SaveSleeveRequestConditionEnum.Damaged]: 'Beschädigt',
  [SaveSleeveRequestConditionEnum.New]: 'Neu',
  [SaveSleeveRequestConditionEnum.Used]: 'Gebraucht',
};
