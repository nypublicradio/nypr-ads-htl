import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import sinon from 'sinon';
import htlbid from 'htlbid';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | htlbid-ad', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{htlbid-ad}}`);
    assert.equal(findAll('.htl-ad').length, 1);
  });

  test('it yields an ad tag', async function(assert) {
    await render(hbs`{{#htlbid-ad as |ad|}}
      {{ad.tag}}
    {{/htlbid-ad}}`);

    assert.equal(findAll('.htl-ad').length, 1);
  });

  test('it yields a default width and height', async function(assert) {
    await render(hbs`{{#htlbid-ad target="foo" as |ad|}}
      <span class="isEmpty">{{ad.isEmpty}}</span>
      <span class="width">{{ad.width}}</span>
      <span class="height">{{ad.height}}</span>
    {{/htlbid-ad}}`);

    assert.equal(this.element.querySelector('.isEmpty').textContent, 'true');
    assert.equal(this.element.querySelector('.width').textContent, '0');
    assert.equal(this.element.querySelector('.height').textContent, '0');
  });

  test('it updates width and height', async function(assert) {
    sinon.stub(htlbid, 'on').callsFake((_,f) => f(mockSlot) );
    let ref = ('ad_test')
    this.set('ref', ref)

    let mockSlot = {
      ref: ref,
      isEmpty: false,
      getRenderedWidth() { return 320; },
      getRenderedHeight() { return 50; }
    };

    await render(hbs`{{#htlbid-ad ref=ref as |ad|}}
      <span class="isEmpty">{{ad.isEmpty}}</span>
      <span class="width">{{ad.width}}</span>
      <span class="height">{{ad.height}}</span>
    {{/htlbid-ad}}`);

    assert.equal(this.element.querySelector('.isEmpty').textContent, 'false');
    assert.equal(this.element.querySelector('.width').textContent, '320');
    assert.equal(this.element.querySelector('.height').textContent, '50');
  });

  test('it sets a ref automatically', async function(assert) {
    await render(hbs`{{htlbid-ad slotClassNames='ad'}}`);
    let div = this.element.querySelector('.ad');
    assert.ok(/ad_ember\d+/.test(div.getAttribute('data-ref')));
  });


});
