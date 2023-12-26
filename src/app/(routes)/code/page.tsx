import { fetchCode } from '@/actions/fetchCode';
import { fetchUser } from '@/actions/fetchUser';
import { CodeGeneration as codeGeneration } from '@/constants';
import { codeGenerationSetting } from './data';

import Heading from '@/components/heading';
import CodeGenerationBody from './components/code-body';

const CodeGenerationPage = async () => {
  const { title, api, icon, bgColor, textColor } = codeGeneration;

  const user = await fetchUser();

  const code = await fetchCode(user);

  const initialPrompts = code.length === 0 ? [codeGenerationSetting] : code;

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        api={api}
        icon={icon}
        bgColor={bgColor}
        textColor={textColor}
      />
      <CodeGenerationBody initialPrompts={initialPrompts} />
    </div>
  );
};

export default CodeGenerationPage;
