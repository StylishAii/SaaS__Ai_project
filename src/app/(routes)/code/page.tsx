import { CodeGeneration as code } from '@/constants';

import Heading from '@/components/heading';
import CodeGenerationBody from './components/code-body';

const CodeGenerationPage = () => {
  const { title, icon, bgColor, textColor } = code;

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <CodeGenerationBody />
    </div>
  );
};

export default CodeGenerationPage;
