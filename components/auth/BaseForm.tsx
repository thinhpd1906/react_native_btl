import { FormProvider, UseFormReturn } from 'react-hook-form';
type Props = {
  children: JSX.Element | JSX.Element[];
  methods: UseFormReturn<any>;
};
function BaseForm({ children, methods }: Props) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}

export default BaseForm;
