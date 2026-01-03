import adapter from '@sveltejs/adapter-node';

const config = { 
  kit: { 
    adapter: adapter({
      out: 'build',
      precompress: false,
      envPrefix: ''
    })
  }
};

export default config;
