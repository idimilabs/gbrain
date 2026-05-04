import { afterEach, describe, expect, test } from 'bun:test';
import { getEmbeddingDimensions, getEmbeddingModel } from '../src/core/embedding.ts';

const OLD_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...OLD_ENV };
});

describe('embedding configuration', () => {
  test('uses OpenAI defaults when no embedding environment variables are set', () => {
    delete process.env.GBRAIN_EMBEDDING_MODEL;
    delete process.env.GBRAIN_EMBEDDING_DIMENSIONS;

    expect(getEmbeddingModel()).toBe('text-embedding-3-large');
    expect(getEmbeddingDimensions()).toBe(1536);
  });

  test('uses GBrain embedding environment variables when provided', () => {
    process.env.GBRAIN_EMBEDDING_MODEL = 'text-embedding-v4';
    process.env.GBRAIN_EMBEDDING_DIMENSIONS = '1536';

    expect(getEmbeddingModel()).toBe('text-embedding-v4');
    expect(getEmbeddingDimensions()).toBe(1536);
  });

  test('rejects an invalid embedding dimension', () => {
    process.env.GBRAIN_EMBEDDING_DIMENSIONS = 'wide';

    expect(() => getEmbeddingDimensions()).toThrow('GBRAIN_EMBEDDING_DIMENSIONS must be a positive integer');
  });
});
