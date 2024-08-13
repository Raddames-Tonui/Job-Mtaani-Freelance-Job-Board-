"""Make job_posting_id nullable in AcceptedFreelancer

Revision ID: 29455d7ac456
Revises: 302a65e4eb4e
Create Date: 2024-08-13 00:46:55.532758

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29455d7ac456'
down_revision = '302a65e4eb4e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('accepted_freelancers', schema=None) as batch_op:
        batch_op.alter_column('job_posting_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('accepted_freelancers', schema=None) as batch_op:
        batch_op.alter_column('job_posting_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###